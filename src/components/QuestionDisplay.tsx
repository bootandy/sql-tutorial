
import React from "react";
import Container from 'react-bootstrap/Container';
import RunSqlBox from "../components/Core";
import initSqlJs from "sql.js";
import QueryResult from "./QueryResult";
import QueryErrors from "./QueryErrors";
import Flexbox from "./Flexbox";


function arraysEqual(a: Array<any>, b: Array<any>) {
  if (a === b) return true;
  if (a == null || b == null) return false;
  if (a.length !== b.length) return false;

  for (var i = 0; i < a.length; ++i) {
    if (a[i] instanceof Array && b[i] instanceof Array) {
      if (!arraysEqual(a[i], b[i])) return false;
    } else {
      if (a[i] !== b[i]) return false;
    }
  }
  return true;
}

type MyState = {
  db: any,
  prevSql: Array<string>,
  sql: string,
  results: Array<{
    columns: Array<string>,
    values: Array<Array<any>>
  }>,
  desiredOutput: Array<{
    columns: Array<string>,
    values: Array<Array<any>>
  }>,
  err: String,
}


type MyProps = {
  setupSql: string,
  initialSql: string,
  correctSql: string,
  description: string,
  title: string
}

export default class QD extends React.Component<MyProps, MyState> {
  constructor(props: any) {
    super(props)
    this.state = {
      db: null,
      sql: '',
      prevSql: [],
      err: '',
      results: [{
        columns: [],
        values: []
      }],
      desiredOutput: [{
        columns: [],
        values: []
      }]
    };
  }

  createDb(dbCreator: any) {
    this.setState({ db: new dbCreator.Database() });

    let errSetup = this.innerExec(this.props.setupSql)[1];

    console.log('Core db built');
    this.exec(this.props.initialSql);

    const temp = this.innerExec(this.props.correctSql);
    const desiredOutput = temp[0]
    // Hack so we can see errors in the initialSql as well as the setup SQL
    const err = temp[1] ? temp[1] : "" + "" + errSetup ? errSetup : "";
    this.setState({ desiredOutput: desiredOutput, err: err });
    this.setState({'sql': this.props.initialSql});
  }

  resetDb = (): void => {
    initSqlJs()
      .then(dbCreator => this.createDb(dbCreator))
      .catch(err => console.log(err));
  }

  componentDidMount() {
    console.log('mounting...');
    this.resetDb();
    console.log('mounted');
  }

  isOutputCorrect = (): boolean => {
    if (!this.state.results || !this.state.desiredOutput) {
      return false
    }
    if (!this.state.results[0] || !this.state.desiredOutput[0]) {
      return false
    }
    const toTest = this.state.results[0].values;
    const correct = this.state.desiredOutput[0].values;
    return arraysEqual(toTest, correct)
  }

  setSql = (sql: string) => {
    this.setState({'sql': sql});
  }

  execUserSql = () => {
    return this.exec(this.state.sql);
  }

  exec = (sql: string) => {
    // let f = new Intl.DateTimeFormat('en');
    // let a = f.format(new TimeStamp());
    const d = new Date();
    const a = d.toLocaleTimeString(); 
    this.state.prevSql.push(a + ": "+ sql )
    // this.setState({ prevSql: a + ": "+ sql });
    this.setState({ prevSql: this.state.prevSql });

    const [results, err] = this.innerExec(sql);
    this.setState({ results, err })
    this.isOutputCorrect();
  }

  innerExec = (sql: string) => {
    let results = null;
    let err = null;
    try {
      // The sql is executed synchronously on the UI thread. 
      // You may want to use a web worker
      results = this.state.db.exec(sql); // an array of objects is returned
    } catch (e) {
      // exec throws an error when the SQL statement is invalid
      err = e.toString();
    }
    return [results, err]
  }

  render() {
    let { db } = this.state;

    if (!db) return <pre>Loading3...</pre>;

    return (
      <Container className="p-2">
        <Flexbox>
          <h3>{this.props.title}</h3>
        </Flexbox>

        <div className="row">
          <div className="col-4">
            <span className="description">
              {this.props.description}
            </span>
          </div>
          <div className="col-8">
            <RunSqlBox
              setupSql={this.props.setupSql}
              initialSql={this.props.initialSql}
              resetDb={this.resetDb}
              setSql={this.setSql}
              runSql={this.execUserSql} />
          </div>
        </div>
        <div className="row">
          <div className="col-6">
            <div>Desired output</div>
            <Flexbox>
              <QueryResult result={this.state.desiredOutput} uniqueName='desired' />
            </Flexbox>
          </div>
          <div className="col-6">
            <Flexbox>
              <QueryErrors errors={this.state.err} />
              <QueryResult result={this.state.results} uniqueName='userRun' />
              {this.isOutputCorrect() ?
                <img src={"/images/tick.png"} width="40" />
                :
                <img src={"/images/cross.png"} width="40" />
              }

            </Flexbox>
              <ul style={{display:'flex', flexDirection: 'column-reverse'}}>
                {this.state.prevSql.map((value) =>
                  <li>{value}</li>
                )}
              </ul>
          </div>
        </div>
      </Container>
    )
  }

}
// export default QD

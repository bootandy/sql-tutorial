
import React from "react";
import Container from 'react-bootstrap/Container';
import RunSqlBox from "../components/Core";
import initSqlJs from "sql.js";
import QueryResult from "./QueryResult";
import QueryResultSingle from "./QueryResultSingle";
import QueryErrors from "./QueryErrors";
import Flexbox from "./Flexbox";
var _ = require('lodash');


function safeArraysEqual(a: any, b: any) {
  if (a !== undefined && b !== undefined && a.values !== undefined && b.values !== undefined) {
    return arraysEqual(a.values, b.values);
  }
  return false
}

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
  sql: string,
  displaySql: Array<string>,
  results: Array<{
    columns: Array<string>,
    values: Array<Array<any>>
  }>,
  baseSelectResults: Array<{
    columns: Array<string>,
    values: Array<Array<any>>
  }>,
  desiredOutput: Array<{
    columns: Array<string>,
    values: Array<Array<any>>
  }>,
  currentOutput: Array<{
    columns: Array<string>,
    values: Array<Array<any>>
  }>,
  err: String,
}


type MyProps = {
  setupSql: string,
  initialSql: string,
  baseSelect: string,
  correctSql: Array<string>,
  description: string,
  title: string
}

export default class QD extends React.Component<MyProps, MyState> {
  constructor(props: any) {
    super(props)
    this.state = {
      db: null,
      sql: '',
      err: '',
      displaySql: props.correctSql.map((v: string) => v.replace('_correct', '')),
      results: [{
        columns: [],
        values: []
      }],
      baseSelectResults: [{
        columns: [],
        values: []
      }],
      desiredOutput: [{
        columns: [],
        values: []
      }],
      currentOutput: [{
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
    const desired = this.innerExec(this.props.correctSql.join(';'))

    // Hack so we can see errors in the initialSql as well as the setup SQL
    const err = desired[1] ? desired[1] : "" + "" + errSetup ? errSetup : "";
    this.setState({ desiredOutput: desired[0], err: err });
    this.setState({ 'sql': this.props.initialSql });
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

  // isOutputCorrect = (): boolean => {
  //   if (!this.state.currentOutput || !this.state.desiredOutput) {
  //     return false
  //   }
  //   if (!this.state.currentOutput[0] || !this.state.desiredOutput[0]) {
  //     return false
  //   }
  //   // const toTest = this.state.results[0].values;
  //   // const correctx = this.state.desiredOutput[0].values;
  //   // return arraysEqual(toTest, correctx)
  //   return arraysEqual(this.state.currentOutput, this.state.desiredOutput);
  // }

  setSql = (sql: string) => {
    this.setState({ 'sql': sql });
  }

  execUserSql = () => {
    return this.exec(this.state.sql);
  }

  exec = (sql: string) => {
    const [results, err] = this.innerExec(sql);
    this.setState({ results, err })
    // this.isOutputCorrect();
    this.updateCurrent();
  }

  updateCurrent = () => {
    const desired = this.innerExec(this.state.displaySql.join(';'))
    // const err = desired[1] ? desired[1] : "" + "" + errSetup ? errSetup : "";
    this.setState({ currentOutput: desired[0] })

    const baseSelect = this.innerExec(this.props.baseSelect);
    this.setState({ baseSelectResults: baseSelect[0] });
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

    const zpo = _.zip(this.state.displaySql, this.state.desiredOutput, this.state.currentOutput);
    const zp = zpo.map((v : Array<any>) => { 
      return [v[0], v[1], v[2], (safeArraysEqual(v[1], v[2]) ? "correct" : "incorrect")];
    });

    return (
      <Container className="p-2">
        <Flexbox>
          <h2>{this.props.title}</h2>
        </Flexbox>

        <div className="row">
          <div className="col-6">
            <span className="description desc">
              {this.props.description}
            </span>
            <pre>
              Select * helper:
            </pre>
            <textarea className="sql-to-run"
              value={this.props.baseSelect}
              readOnly
              disabled
              rows={this.props.baseSelect.split('\n').length}
            />
              <Flexbox>
                <QueryResult result={this.state.baseSelectResults} uniqueName='baseSelectResults' />
              </Flexbox>
          </div>

          <div className="col-6">
            <RunSqlBox
              setupSql={this.props.setupSql}
              initialSql={this.props.initialSql}
              resetDb={this.resetDb}
              setSql={this.setSql}
              runSql={this.execUserSql} />
            <Flexbox>
              <QueryErrors errors={this.state.err} />
              <QueryResult result={this.state.results} uniqueName='userRun' />
            </Flexbox>
          </div>
        </div>
        <div className="row">

          <div className="col-6"></div>

          <div className="col-6">
          </div>
        </div>

        <div className="row">
          <div className="col-12">
            <h4>Desired outputs</h4>
            <div className="App desiredOutputs">

              {zp.map((value: Array<any>) =>
                <div >
                  <textarea rows={value[0].split('\n').length} readOnly disabled className="desiredTextarea" value={value[0]} />

                  <Container className="p-2">

                    <div className={value[3] +" row"}>
                      <div className="col-6 ">
                        <h5>Desired:</h5>
                        <Flexbox>
                          <QueryResultSingle result={value[1]} />
                        </Flexbox>
                      </div>
                      <div className="col-6">
                        <h5>Current:</h5>
                        <Flexbox>
                          <QueryResultSingle result={value[2]} />
                        </Flexbox>
                      </div>
                    </div>
                  </Container>
                </div>
              )}
            </div>
          </div>

        </div>
      </Container>
    )
  }

}
// export default QD

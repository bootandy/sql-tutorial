import React from "react";
import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup'


type MyProps = {
  setupSql: string,
  initialSql: string,
  hint?: string,
  runSql: () => void,
  setSql: (sql: string) => void,
  resetDb: () => void,
}


export default class RunSqlBox extends React.Component<MyProps, {}> {

  constructor(props: any) {
    super(props)
  }

  render() {

    return (
      <div className="App">
        <textarea className="sql-to-run"
          defaultValue={this.props.initialSql}
          onChange={event => { this.props.setSql(event.target.value) }}
          rows={10}
        />
        <pre className="no-pad">
          <ButtonGroup aria-label="runs" className="mb-2 run-button-group">
            <span className="run-buttons">
              <Button variant="primary" onClick={e => this.props.runSql()}>Run</Button>
            </span>
            {this.props.hint &&
            <span className="run-buttons">
              <Button variant="primary" className="">Hint</Button>
            </span>
            }
            <span className="run-buttons">
              <Button variant="primary" onClick={e => this.props.resetDb()} >Reset DB</Button>
            </span>
          </ButtonGroup>
        </pre>
      </div>
    );
  }

}

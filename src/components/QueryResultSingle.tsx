import React from "react";

export type SingleCorePropResult = {
  result: {
    columns: Array<string>,
    values: Array<Array<any>>
  }
}


export default class QueryResultSingle extends React.Component<SingleCorePropResult> {

  render() {
    if (this.props.result !== null && this.props.result !== undefined && this.props.result.columns !== undefined) {
      return (
        <table className="results">
          <thead>
            <tr>
              {this.props.result.columns.map((columnName, idx) =>
                <th key={'result: ' + ' ' + idx}>{columnName}</th>
              )}
            </tr>
          </thead>

          <tbody>
            {this.props.result.values.map((row, idx) =>
              <tr key={' ' + idx}>
                {row.map((value, idx2) =>
                  <td key={idx + ' ' + idx2}>{value}</td>
                )}
              </tr>
            )}
          </tbody>
        </table>
      )
    } else {
      return <pre />
    }
  }
}

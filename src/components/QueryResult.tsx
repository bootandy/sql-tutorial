import React from "react";
import QueryResultSingle from "./QueryResultSingle";


export type CorePropResult = {
  // result: Array<SingleCorePropResult>,
  result: Array<{
    columns: Array<string>,
    values: Array<Array<any>>
  }>,
  uniqueName: string,
}


// props vs states:
// props get passed to the component (similar to function parameters)
// whereas state is managed within the component (similar to variables declared within a function).

// Use STATE to store the data your current page needs in your controller-view.
// Use PROPS to pass data & event handlers down to your child components. 
// props = immutable

// The state of one component will often become the props of a child component

export default class QueryResult extends React.Component<CorePropResult> {

  render() {
    if (this.props.result !== null && this.props.result !== undefined && this.props.result.length > 0) {
      return (
        <>
          {this.props.result.map((res, id) =>
            <div key={'result:' + id} className='results'>
              <QueryResultSingle result={res} />
            </div>
          )}
        </>
      );
    } else {
      return <pre />
    }
  }
}

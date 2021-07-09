import React from "react";

export type CorePropError = {
  errors: String
}

export default class QueryErrors extends React.Component<CorePropError> {

  render() {
    let err = this.props.errors;
    if (err !== '' && err !== null) {
      return (
        <div className="error">{(err).toString()}</div>
      )
    } else {
      return (<></> )
    }
  }

}

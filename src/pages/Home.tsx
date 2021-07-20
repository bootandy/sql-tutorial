
import React from 'react';
import { Link } from "react-router-dom";

import initSqlJs from "sql.js";


export default class Home extends React.Component {
  render() {

    initSqlJs()
    return (
      <div>
        <header>
          SQL quiz site.
        </header>
        <pre> 
          Test your SQL knowledge. 
          Goes beyond the basic insert/select stuff, but no window functions.
          Uses SQLites
        </pre>

        <Link to="/fundamentals/q1">SQL fundamentals</Link>
        <Link to="/gotchas/q1">SQL gotchas </Link>
        <Link to="/insert/q1">SQL insert puzzles</Link>
      </div>
    );
  }
}

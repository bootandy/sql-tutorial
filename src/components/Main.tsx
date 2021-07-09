import { Switch, Route } from 'react-router-dom';

import Container from 'react-bootstrap/Container';


import Home from '../pages/Home';
import Q1 from '../pages/gotchas/Q1';
import Q2 from '../pages/gotchas/Q2';
import Q3 from '../pages/gotchas/Q3';
import Q4 from '../pages/gotchas/Q4';
import Q5 from '../pages/gotchas/Q5';

import F1 from '../pages/fundamentals/Q1';
import F2 from '../pages/fundamentals/Q2';
import F3 from '../pages/fundamentals/Q3';
import F4 from '../pages/fundamentals/Q4';
import F5 from '../pages/fundamentals/Q5';

import B1 from '../pages/backwards/Q1';
import B2 from '../pages/backwards/Q2';
import B3 from '../pages/backwards/Q3';


const Main = () => {
    return (
        <Container className="p-3">

            <Switch>
                <Route exact path='/' component={Home}></Route>

                <Route exact path='/gotchas/q1' component={Q1}></Route>
                <Route exact path='/gotchas/q2' component={Q2}></Route>
                <Route exact path='/gotchas/q3' component={Q3}></Route>
                <Route exact path='/gotchas/q4' component={Q4}></Route>
                <Route exact path='/gotchas/q5' component={Q5}></Route>

                <Route exact path='/fundamentals/q1' component={F1}></Route>
                <Route exact path='/fundamentals/q2' component={F2}></Route>
                <Route exact path='/fundamentals/q3' component={F3}></Route>
                <Route exact path='/fundamentals/q4' component={F4}></Route>
                <Route exact path='/fundamentals/q5' component={F5}></Route>
                
                <Route exact path='/backwards/q1' component={B1}></Route>
                <Route exact path='/backwards/q2' component={B2}></Route>
                <Route exact path='/backwards/q3' component={B3}></Route>

                <Route path='/gotchas' component={Home}></Route>
                <Route path='/fundamentals' component={Home}></Route>
                <Route path='/backwards' component={Home}></Route>
            </Switch>
        </Container>
    );
}

export default Main;

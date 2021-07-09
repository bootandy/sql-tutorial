import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Jumbotron from 'react-bootstrap/Jumbotron'
import { Link } from 'react-router-dom'


const regex = /\/q\d/;

const getPrevQuestion = () :string => {
    return getNeighbourQuestion(-1)
}

const getNextQuestion = () :string => {
    return getNeighbourQuestion(1)
}

// Warning: Will break if there is ever a '/q' in the url apart from the
// question bit on the end
const getNeighbourQuestion = (inc : number) :string => {
    const loc : string = window.location.pathname
    const mt = loc.match(regex);
    if (mt && mt.length > 0) {
        const number = mt[0].substring(2);
        const nxt = parseInt(number) + inc
        const result = loc.replace(regex, '/q' + nxt);
        return result
    }
    return '/'
}


const Heading: React.FunctionComponent<{}> = props => {
    const prev = getPrevQuestion();
    const nxt = getNextQuestion();
    return (
        <>
            <Navbar bg="dark" variant="dark" fixed="top" >
                <Navbar.Brand href="/">Home</Navbar.Brand>
                <Nav className="mr-auto">
                    <Nav.Link href="/">Home</Nav.Link>
                    <Nav.Link href="/fundamentals">Questions</Nav.Link>
                    <Nav.Link href="/about">About</Nav.Link>
                </Nav>
                <Form inline>
                    <Button variant="outline-info">Github</Button>
                </Form>
            </Navbar>

            <div className="container ">
                <ButtonGroup aria-label="Basic example" size="lg" className="mb-2 ">
                    <Button variant="secondary" href="/fundamentals/q1">Fundamentals</Button>
                    <Button variant="secondary" href="/gotchas/q1">Gotchas</Button>
                    <Button variant="secondary" href="/backwards/q1">Backwards</Button>
                    <Button variant="secondary">Quiz</Button>
                </ButtonGroup>
            </div>
            <Jumbotron>
                <div>
                    <Link to={prev}>prev</Link>
                    <Link style={{float:'right'}} to={nxt}>next</Link>
                </div>
                {props.children}
            </Jumbotron>
        </>
    )
}

export default Heading;

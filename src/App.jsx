import logo from './logo.svg';
import './App.css';
import { BootstrapCard } from './components/Card'
import {Row, Col} from 'react-bootstrap'
 
function App() {
  return (
    <div className="App">
      <h1>Hallo Martin!</h1>
      <p>Willkommen in deiner ersten React Application.</p>
      <p>Hier kannst du mit HTML, CSS, JS und React deine Projekt umsetzt.</p>
      <Row>
        <Col>
          <BootstrapCard title="Bootstrap Card" link="https://react-bootstrap.github.io/components/cards/" />
        </Col>
        <Col>
          <BootstrapCard title="Bootstrap Grid" link="https://react-bootstrap.github.io/layout/grid/" />
        </Col>
        <Col>
          <BootstrapCard title="React Doku" link="https://reactjs.org/docs/getting-started.html#learn-react" />
        </Col>
        <Col>
          <BootstrapCard title="Bootstrap Tutorial" link="https://www.freecodecamp.org/learn/front-end-development-libraries/#bootstrap" />
        </Col>
        <Col>
          <BootstrapCard title="Bootstrap Card" link="https://react-bootstrap.github.io/components/cards/" />
        </Col>
      </Row>
    </div>
  );
}

export default App;

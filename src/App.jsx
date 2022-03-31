import logo from './logo.svg';
import './App.css';
import { BootstrapCard } from './components/Card'
import {Row, Col} from 'react-bootstrap'
import { InputWithLabel } from './components/InputWithLabel';
import { CreateNewForm } from './components/CreateNewForm';
 
function App() {
  return (
    <div className="App">
      <CreateNewForm />
    </div>
  );
}

export default App;
/*
Bootstrap Card: https://react-bootstrap.github.io/components/cards/
Bootstrap Grid: https://react-bootstrap.github.io/layout/grid/
React Doku: https://reactjs.org/docs/getting-started.html#learn-react
Bootstrap Tutorial: https://www.freecodecamp.org/learn/front-end-development-libraries/#bootstrap
Bootstrap Card: https://react-bootstrap.github.io/components/cards/
*/
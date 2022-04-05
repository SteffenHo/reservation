import logo from './logo.svg';
import './App.css';
import { BootstrapCard } from './components/Card'
import {Row, Col} from 'react-bootstrap'
import { CreateNewForm } from './components/CreateNewForm';
import { AddDependenciesForm } from './components/AddDependenciesForm';
import { SearchProduct } from './components/SearchProduct';
import 'bootstrap/dist/css/bootstrap.min.css';
import { UpdateProduct } from './components/UpdateProduct';
 
function App() {
  return (
    <div className="App">
      <CreateNewForm />
      <AddDependenciesForm />
      <SearchProduct />
      <UpdateProduct />
      <div className="heigth-div" />
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
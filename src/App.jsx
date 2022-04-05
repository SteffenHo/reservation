import logo from './logo.svg';
import './App.css';
import { BootstrapCard } from './components/Card'
import {Row, Col, Navbar, Container, Nav} from 'react-bootstrap'
import { CreateNewForm } from './components/CreateNewForm';
import { AddDependenciesForm } from './components/AddDependenciesForm';
import { SearchProduct } from './components/SearchProduct';
import 'bootstrap/dist/css/bootstrap.min.css';
import { UpdateProduct } from './components/UpdateProduct';
import React, {useState} from 'react';
 
function App() {
  const [selectedTab, setSelectedTab] = useState(3);

  return (
    <div className="App">
      <Navbar bg="light" variant="light">
        <Container>
          <Navbar.Brand>
            Produkt- / Servicekaterlog
          </Navbar.Brand>
          <Nav variant='tabs' activeKey={selectedTab} onSelect={event => setSelectedTab(parseInt(event))}>
            <Nav.Item>
              <Nav.Link eventKey={1}>
                Neues Produkt / Neuer Service
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey={2}>
                Abhängigkeiten
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey={3}>
                Produkt / Service suchen
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey={4}>
                Produkt / Service bearbeiten
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Container>
      </Navbar>
      {selectedTab === 1 && <CreateNewForm />}
      {selectedTab === 2 && <AddDependenciesForm />}
      {selectedTab === 3 && <SearchProduct />}
      {selectedTab === 4 && <UpdateProduct />}
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
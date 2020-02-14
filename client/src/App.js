import React from 'react';
import logo from './logo.svg';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';
import './App.css';

import ProjectList from './ProjectList';
import ProjectPage from './ProjectPage';

function App() {
  return (
    <div className="App">
      <Container>
        <Row>
          <Col lg="4" md="6">
            <header className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
              <p>
                Edit <code>src/App.js</code> and save to reload.
              </p>
            </header>
          </Col>
          <Col lg="8" md="6">
            <Router>
              <Switch>
                <Route path="projects/:id" component={ProjectPage} />
                <Route exact path="/" component={ProjectList} />
              </Switch>
            </Router>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;

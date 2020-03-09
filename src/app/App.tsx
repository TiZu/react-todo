import React from 'react';
import './App.css';

import TodoInput from './components/todo/TodoForm';
import TodoListContainer from './components/todo/TodoListContainer';

import { Container, Row, Col } from 'react-bootstrap';

function App() {
  return (
    <Container>
      <h3>Sample Todo App</h3>
      <Row>
        <Col>
          <TodoInput />
        </Col>
      </Row>
      <Row>
        <Col>&nbsp;</Col>
      </Row>
      <Row>
        <Col>
          <TodoListContainer />
        </Col>
      </Row>
    </Container>
  );
}

export default App;

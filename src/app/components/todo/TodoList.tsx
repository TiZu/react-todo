import React, { Component } from 'react';

import AppState from '../../models/state/AppState';
import { connect } from 'react-redux';

import TodoItem from './TodoItem';
import { Col, ListGroup, Row } from 'react-bootstrap';

export enum TodoType {
  Active = 'Active',
  Completed = 'Completed',
}

interface OwnProps {
  todoType: TodoType;
}

interface StateProps {
  activeTodoIds: string[];
  completedTodoIds: string[];
}

interface DispatchProps {}

type Props = OwnProps & StateProps & DispatchProps;

class TodoList extends Component<Props, AppState> {
  public render() {
    return (
      <Row>
        <Col>
          <ListGroup>
            {this.props.todoType === TodoType.Active &&
              this.props.activeTodoIds.map(id => {
                return <TodoItem key={id} todoId={id} />;
              })}
            {this.props.todoType === TodoType.Completed &&
              this.props.completedTodoIds.map(id => {
                return <TodoItem key={id} todoId={id} />;
              })}
          </ListGroup>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = (state: AppState): StateProps => ({
  activeTodoIds: state.ui.todos.activeIds,
  completedTodoIds: state.ui.todos.completedIds,
});

const mapDispatchToProps = (): DispatchProps => ({});

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);

import React, { Component } from 'react';

import AppState from '../../models/state/AppState';
import { connect } from 'react-redux';

import TodoItem from './TodoItem';

import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';

export enum TodoType {
  Active = 'Active',
  Completed = 'Completed',
  All = 'All',
}

interface OwnProps {
  todoType: TodoType;
}

interface StateProps {
  activeTodoIds: string[];
  completedTodoIds: string[];
  allTodoIds: string[];
}

interface DispatchProps {}

type Props = OwnProps & StateProps & DispatchProps;

class TodoList extends Component<Props, AppState> {
  public render() {
    return (
      <Grid item>
        <List>
          {this.props.todoType === TodoType.Active &&
            this.props.activeTodoIds.map(id => {
              return <TodoItem key={id} todoId={id} />;
            })}
          {this.props.todoType === TodoType.Completed &&
            this.props.completedTodoIds.map(id => {
              return <TodoItem key={id} todoId={id} />;
            })}
          {this.props.todoType === TodoType.All &&
            this.props.allTodoIds.map(id => {
              return <TodoItem key={id} todoId={id} />;
            })}
        </List>
      </Grid>
    );
  }
}

const mapStateToProps = (state: AppState): StateProps => ({
  activeTodoIds: state.ui.todos.activeIds,
  completedTodoIds: state.ui.todos.completedIds,
  allTodoIds: state.ui.todos.allIds,
});

const mapDispatchToProps = (): DispatchProps => ({});

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);

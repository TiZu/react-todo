import React, { Component } from 'react';

import AppState from '../../models/state/AppState';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import Todo from '../../models/todo/Todo';
import { createRemoveTodoAction } from '../../store/actions/todo/RemoveTodoAction';
import { createToggleTodoAction } from '../../store/actions/todo/ToggleTodoAction';

import { ListItem, ListItemIcon, ListItemText, ListItemSecondaryAction, Checkbox, IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

interface OwnProps {
  todoId: string;
}

interface StateProps {
  todo: Todo;
}

interface DispatchProps {
  removeTodo: any;
  toggleTodo: any;
}

type Props = OwnProps & StateProps & DispatchProps;

class TodoItem extends Component<Props, AppState> {
  constructor(props: Props) {
    super(props);
    this.handleToggleTodo = this.handleToggleTodo.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  public render() {
    return (
      <ListItem dense button onClick={this.handleToggleTodo}>
        <ListItemIcon>
          <Checkbox edge="start" checked={this.props.todo.isCompleted} tabIndex={-1} disableRipple />
        </ListItemIcon>
        <ListItemText id={`text_${this.props.todoId}`} primary={this.props.todo.text} />
        <ListItemSecondaryAction onClick={this.handleDelete}>
          <IconButton edge="end" aria-label="delete">
            <DeleteIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    );
  }

  private handleToggleTodo() {
    this.props.toggleTodo(this.props.todo.id);
  }

  private handleDelete() {
    this.props.removeTodo(this.props.todo.id);
  }
}

const mapStateToProps = (state: AppState, ownProps: OwnProps): StateProps => ({
  todo: state.data.todos.byId[ownProps.todoId],
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  removeTodo: (id: string) => {
    dispatch(createRemoveTodoAction(id));
  },
  toggleTodo: (id: string) => {
    dispatch(createToggleTodoAction(id));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoItem);

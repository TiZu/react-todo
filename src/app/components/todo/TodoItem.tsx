import React, { Component } from 'react';

import AppState from '../../models/state/AppState';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import Todo from '../../models/todo/Todo';
import { createRemoveTodoAction } from '../../store/actions/todo/RemoveTodoAction';
import { createToggleTodoAction } from '../../store/actions/todo/ToggleTodoAction';
import { Button, ButtonGroup, ListGroupItem } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faCheck, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

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
      <ListGroupItem>
        <div className="d-flex w-100 justify-content-between">
          <div>
            {this.props.todo.text}
          </div>
          <div>
            <ButtonGroup>
              <Button type="button" onClick={this.handleToggleTodo} variant="primary">
                {this.props.todo.isCompleted ? <FontAwesomeIcon icon={faPlus} /> : <FontAwesomeIcon icon={faCheck} />}
              </Button>
              <Button type="button" onClick={this.handleDelete} variant="danger">
                <FontAwesomeIcon icon={faTrashAlt} />
              </Button>
            </ButtonGroup>
          </div>
        </div>
      </ListGroupItem>
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

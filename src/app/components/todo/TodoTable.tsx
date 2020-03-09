import React, { Component } from 'react';

import {Row, Col, Table, Button} from 'react-bootstrap';
import AppState from '../../models/state/AppState';
import Todo from '../../models/todo/Todo';
import { connect } from 'react-redux';
import * as _ from 'lodash';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrashAlt} from "@fortawesome/free-solid-svg-icons";
import {Dispatch} from "redux";
import {createRemoveTodoAction} from "../../store/actions/todo/RemoveTodoAction";

interface OwnProps {}

interface StateProps {
  todos: Todo[];
}

interface DispatchProps {
  removeTodo: any;
}

type Props = OwnProps & StateProps & DispatchProps;

class TodoTable extends Component<Props, AppState> {
  constructor(props: Props) {
    super(props);
    this.handleDelete = this.handleDelete.bind(this);
  }
  public render() {
    return (
      <Row>
        <Col>
          <Table>
            <thead>
              <tr>
                <th>Id</th>
                <th>Text</th>
                <th>Completed?</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {this.props.todos.map(todo => {
                return (
                  <tr key={todo.id}>
                    <td>{todo.id}</td>
                    <td>{todo.text}</td>
                    <td>{todo.isCompleted ? 'true' : 'false'}</td>
                    <td>
                      <Button type="button" onClick={() => this.handleDelete(todo.id)} variant="danger">
                        <FontAwesomeIcon icon={faTrashAlt} />
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Col>
      </Row>
    );
  }

  private handleDelete(id: string) {
    this.props.removeTodo(id);
  }
}

const mapStateToProps = (state: AppState): StateProps => ({
  todos: _.values(state.data.todos.byId),
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  removeTodo: (id: string) => {
    dispatch(createRemoveTodoAction(id));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoTable);

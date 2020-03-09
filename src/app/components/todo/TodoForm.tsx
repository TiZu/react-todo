import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { createAddTodoAction } from '../../store/actions/todo/AddTodoAction';
import { Button, Col, Form, FormControl, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

interface OwnState {
  newTodoText: string;
}

interface DispatchProps {
  addTodo: any;
}

type Props = DispatchProps;

class TodoForm extends Component<Props, OwnState> {
  constructor(props: Props) {
    super(props);
    this.state = { newTodoText: '' };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  public render() {
    return (
      <Form action="/" onSubmit={this.handleSubmit}>
        <Row>
          <Col>
            <FormControl
              type="text"
              placeholder="What needs to be done?"
              value={this.state.newTodoText}
              onChange={this.handleChange}
            />
          </Col>
          <Col md={1}>
            <Button type="submit" variant="primary">
              <FontAwesomeIcon icon={faPlus} />
            </Button>
          </Col>
        </Row>
      </Form>
    );
  }

  private handleChange(e: any): void {
    this.setState({
      newTodoText: e.target.value,
    });
  }

  private handleSubmit(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    if (this.state.newTodoText) {
      this.props.addTodo(this.state.newTodoText);
      this.setState({
        newTodoText: '',
      });
    }
  }
}

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  addTodo: (text: string) => {
    dispatch(createAddTodoAction(text));
  },
});

export default connect(undefined, mapDispatchToProps)(TodoForm);

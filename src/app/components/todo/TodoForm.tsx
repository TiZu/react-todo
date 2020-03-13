import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { createAddTodoAction } from '../../store/actions/todo/AddTodoAction';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import AddIcon from '@material-ui/icons/Add';

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
      <form action="/" onSubmit={this.handleSubmit}>
        <Grid container spacing={2} justify="flex-start" alignItems="stretch">
          <Grid item xs={11}>
            <TextField
              id="add-todo-input"
              value={this.state.newTodoText}
              onChange={this.handleChange}
              placeholder="What needs to be done?"
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={1}>
            <Button type="submit" variant="contained" color="primary" disableElevation>
              <AddIcon />
            </Button>
          </Grid>
        </Grid>
      </form>
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

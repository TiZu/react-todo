import React, { Component } from 'react';

import AppState from '../../models/state/AppState';
import { connect } from 'react-redux';

import TodoItem from './TodoItem';

import { Theme, withStyles, createStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';

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

const StyledBadge = withStyles((theme: Theme) =>
  createStyles({
    badge: {
      top: 15,
      right: -18,
    },
  })
)(Badge);

class TodoList extends Component<Props, AppState> {
  public render() {
    let badgeContent = 0;
    switch (this.props.todoType) {
      case TodoType.Active:
        badgeContent = this.props.activeTodoIds.length;
        break;
      case TodoType.Completed:
        badgeContent = this.props.completedTodoIds.length;
        break;
      case TodoType.All:
        badgeContent = this.props.allTodoIds.length;
        break;
    }

    return (
      <Grid item>
        <Grid item>
          <StyledBadge badgeContent={badgeContent} color="primary" showZero>
            <Typography component="h1" variant="h6">
              {this.props.todoType}
            </Typography>
          </StyledBadge>
        </Grid>
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

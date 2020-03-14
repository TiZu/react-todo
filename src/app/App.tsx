import React from 'react';
import './App.css';

import TodoInput from './components/todo/TodoForm';
import TodoList, { TodoType } from './components/todo/TodoList';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

function App() {
  return (
    <Container fixed>
      <Grid container direction="column" spacing={4} justify="flex-start" alignItems="stretch">
        <Grid item>
          <Typography component="h1" variant="h5">
            Sample Todo App
          </Typography>
        </Grid>
        <Grid item>
          <TodoInput />
        </Grid>
        <Grid item>
          <TodoList todoType={TodoType.Active} />
        </Grid>
        <Grid item>
          <TodoList todoType={TodoType.Completed} />
        </Grid>
        <Grid item>
          <TodoList todoType={TodoType.All} />
        </Grid>
      </Grid>
    </Container>
  );
}

export default App;

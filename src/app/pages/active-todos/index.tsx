import React from 'react';
import TodoList, { TodoType } from '../../components/todo/TodoList';

function ActiveTodosPage() {
  return <TodoList todoType={TodoType.Active} />;
}

export default ActiveTodosPage;

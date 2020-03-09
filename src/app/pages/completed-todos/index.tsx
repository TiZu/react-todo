import React from 'react';
import TodoList, { TodoType } from '../../components/todo/TodoList';

function CompletedTodosPage() {
  return <TodoList todoType={TodoType.Completed} />;
}

export default CompletedTodosPage;

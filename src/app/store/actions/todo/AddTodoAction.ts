import { Action } from 'redux';
import { v1 as uuid } from 'uuid';

import TodoActionType from './TodoActionType';
import Todo from '../../../models/todo/Todo';

export interface AddTodoActionPayload {
  todo: Todo;
}

export interface AddTodoAction extends Action {
  type: TodoActionType.add;
  payload: AddTodoActionPayload;
}

export function createAddTodoAction(text: string): AddTodoAction {
  const newTodo: Todo = {
    id: uuid(),
    text: text,
    isCompleted: false,
  };

  return {
    type: TodoActionType.add,
    payload: {
      todo: newTodo,
    },
  };
}

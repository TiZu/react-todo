import { Action } from 'redux';
import TodoActionType from './TodoActionType';

export interface ToggleTodoActionPayload {
  id: string;
}

export interface ToggleTodoAction extends Action {
  type: TodoActionType.toggle;
  payload: ToggleTodoActionPayload;
}

export function createToggleTodoAction(id: string): ToggleTodoAction {
  return {
    type: TodoActionType.toggle,
    payload: {
      id: id,
    },
  };
}

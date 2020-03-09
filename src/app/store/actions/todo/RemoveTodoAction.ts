import { Action } from 'redux';
import TodoActionType from './TodoActionType';

export interface RemoveTodoActionPayload {
  id: string;
}

export interface RemoveTodoAction extends Action {
  type: TodoActionType.remove;
  payload: RemoveTodoActionPayload;
}

export function createRemoveTodoAction(id: string): RemoveTodoAction {
  return {
    type: TodoActionType.remove,
    payload: {
      id: id,
    },
  };
}

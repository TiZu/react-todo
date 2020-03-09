import { Action } from 'redux';
import produce, { Draft } from 'immer';
import * as _ from 'lodash';

import TodoUiState from '../../../models/state/ui/TodoUiState';
import TodoActionType from '../../actions/todo/TodoActionType';
import { AddTodoAction } from '../../actions/todo/AddTodoAction';
import { RemoveTodoAction } from '../../actions/todo/RemoveTodoAction';
import { ToggleTodoAction } from '../../actions/todo/ToggleTodoAction';

const initialState: TodoUiState = {
  activeIds: ['27e9e9e0-609b-11ea-8aac-a3bc2d5ddaef'],
  completedIds: ['463cf9a0-609b-11ea-90d5-59159914f7f1', '4b919190-609b-11ea-a9ff-5f77f70f6fbc'],
  allIds: [
    '27e9e9e0-609b-11ea-8aac-a3bc2d5ddaef',
    '463cf9a0-609b-11ea-90d5-59159914f7f1',
    '4b919190-609b-11ea-a9ff-5f77f70f6fbc',
  ],
};

function handleAddTodoAction(state: TodoUiState, action: AddTodoAction): TodoUiState {
  return produce(state, (draft: Draft<TodoUiState>) => {
    draft.allIds = _.concat(draft.allIds, action.payload.todo.id);
    if (action.payload.todo.isCompleted) {
      draft.completedIds = _.concat(draft.completedIds, action.payload.todo.id);
    } else {
      draft.activeIds = _.concat(draft.activeIds, action.payload.todo.id);
    }
  });
}

function handleRemoveTodoAction(state: TodoUiState, action: RemoveTodoAction): TodoUiState {
  return produce(state, (draft: Draft<TodoUiState>) => {
    _.remove(draft.allIds, item => item === action.payload.id);
    _.remove(draft.activeIds, item => item === action.payload.id);
    _.remove(draft.completedIds, item => item === action.payload.id);
  });
}

function handleToggleTodoAction(state: TodoUiState, action: ToggleTodoAction): TodoUiState {
  return produce(state, (draft: Draft<TodoUiState>) => {
    const removedActive = _.remove(draft.activeIds, item => item === action.payload.id);
    const removedCompleted = _.remove(draft.completedIds, item => item === action.payload.id);

    draft.activeIds = _.concat(draft.activeIds, removedCompleted);
    draft.completedIds = _.concat(draft.completedIds, removedActive);
  });
}

export default function todoUiReducer(state: TodoUiState = initialState, action: Action): TodoUiState {
  switch (action.type) {
    case TodoActionType.add:
      return handleAddTodoAction(state, action as AddTodoAction);
    case TodoActionType.remove:
      return handleRemoveTodoAction(state, action as RemoveTodoAction);
    case TodoActionType.toggle:
      return handleToggleTodoAction(state, action as ToggleTodoAction);
    default:
      return state;
  }
}

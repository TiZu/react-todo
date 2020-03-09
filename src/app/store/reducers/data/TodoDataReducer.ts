import { Action } from 'redux';
import produce, { Draft } from 'immer';
import * as _ from 'lodash';

import TodoDataState from '../../../models/state/data/TodoDataState';
import TodoActionType from '../../actions/todo/TodoActionType';
import { AddTodoAction } from '../../actions/todo/AddTodoAction';
import { RemoveTodoAction } from '../../actions/todo/RemoveTodoAction';
import { ToggleTodoAction } from '../../actions/todo/ToggleTodoAction';

const initialState: TodoDataState = {
  allIds: [
    '27e9e9e0-609b-11ea-8aac-a3bc2d5ddaef',
    '463cf9a0-609b-11ea-90d5-59159914f7f1',
    '4b919190-609b-11ea-a9ff-5f77f70f6fbc',
  ],
  byId: {
    '27e9e9e0-609b-11ea-8aac-a3bc2d5ddaef': {
      id: '27e9e9e0-609b-11ea-8aac-a3bc2d5ddaef',
      text: 'Try sample todo app',
      isCompleted: false,
    },
    '463cf9a0-609b-11ea-90d5-59159914f7f1': {
      id: '463cf9a0-609b-11ea-90d5-59159914f7f1',
      text: 'Implement sample todo app using React, React-Router-Dom, Redux, Immer & Bootstrap',
      isCompleted: true,
    },
    '4b919190-609b-11ea-a9ff-5f77f70f6fbc': {
      id: '4b919190-609b-11ea-a9ff-5f77f70f6fbc',
      text: 'Learn React, React-Router-Dom & Redux',
      isCompleted: true,
    },
  },
};

function handleAddTodoAction(state: TodoDataState, action: AddTodoAction): TodoDataState {
  return produce(state, (draft: Draft<TodoDataState>) => {
    draft.allIds = _.concat(draft.allIds, action.payload.todo.id);
    draft.byId[action.payload.todo.id] = action.payload.todo;
  });
}

function handleRemoveTodoAction(state: TodoDataState, action: RemoveTodoAction): TodoDataState {
  return produce(state, (draft: Draft<TodoDataState>) => {
    _.remove(draft.allIds, item => item === action.payload.id);
    draft.byId = _.omit(draft.byId, action.payload.id);
  });
}

function handleToggleTodoAction(state: TodoDataState, action: ToggleTodoAction): TodoDataState {
  return produce(state, (draft: Draft<TodoDataState>) => {
    draft.byId[action.payload.id].isCompleted = !draft.byId[action.payload.id].isCompleted;
  });
}

export default function todoDataReducer(state: TodoDataState = initialState, action: Action): TodoDataState {
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

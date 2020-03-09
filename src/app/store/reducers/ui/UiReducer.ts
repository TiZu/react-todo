import { combineReducers } from 'redux';
import UiState from '../../../models/state/ui/UiState';
import todoUiReducer from './TodoUiReducer';

const uiReducer = combineReducers<UiState>({
  todos: todoUiReducer,
});

export default uiReducer;

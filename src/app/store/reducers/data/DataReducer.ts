import { combineReducers } from 'redux';
import DataState from '../../../models/state/data/DataState';
import todoDataReducer from './TodoDataReducer';

const dataReducer = combineReducers<DataState>({
  todos: todoDataReducer,
});

export default dataReducer;

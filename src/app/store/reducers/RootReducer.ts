import { combineReducers } from 'redux';
import AppState from '../../models/state/AppState';
import dataReducer from './data/DataReducer';
import uiReducer from './ui/UiReducer';

const rootReducer = combineReducers<AppState>({
  data: dataReducer,
  ui: uiReducer,
});

export default rootReducer;

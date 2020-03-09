import DataState from './data/DataState';
import UiState from './ui/UiState';

export default interface AppState {
  data: DataState;
  ui: UiState;
}

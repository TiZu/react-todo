import TodoDictionary from '../../todo/TodoDictionary';

export default interface TodoDataState {
  byId: TodoDictionary;
  allIds: string[];
}

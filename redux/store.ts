import { createStore, combineReducers } from 'redux';
import notes from './reducers/NotesReducer';

export default createStore(
  combineReducers({ notes })
);
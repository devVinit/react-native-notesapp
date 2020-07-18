import { createStore, combineReducers } from 'redux';
import notes from './reducers/NotesReducer';
import loginStatus from './reducers/LoginReducer';

export default createStore(
  combineReducers({ notes, loginStatus })
);
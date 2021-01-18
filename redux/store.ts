import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import notes from "./reducers/NotesReducer";
import loginStatus from "./reducers/LoginReducer";
import toaster from "./reducers/ToasterReducer";
import { saveState } from "../AsyncStorageSync";

const store = createStore(
  combineReducers<any>({ notes, loginStatus, toaster }),
  applyMiddleware(thunk)
);

store.subscribe(() => {
  saveState(store.getState());
});

export default store;

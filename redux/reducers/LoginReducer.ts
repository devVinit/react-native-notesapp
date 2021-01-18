import { LOGIN_APP } from "../actions/ActionTypes";

const initialState = false;

const loginStatus = (state = initialState, action: any) => {
  switch (action.type) {
    case LOGIN_APP:
      return action.payload;
    default:
      return state;
  }
};

export default loginStatus;

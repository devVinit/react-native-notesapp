import { TOGGLE_TOASTER } from "../actions/ActionTypes";

const initialState = {
  show: false,
  message: "",
};

const toaster = (state = initialState, action: any) => {
  switch (action.type) {
    case TOGGLE_TOASTER:
      return { ...action.payload };
    default:
      return state;
  }
};

export default toaster;

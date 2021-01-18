import { LOGIN_APP } from "./ActionTypes";

export function appLogin(payload: any) {
  return {
    type: LOGIN_APP,
    payload,
  };
}

import { TOGGLE_TOASTER } from "./ActionTypes";

export function toggleToaster(payload: any) {
  return (dispatch: any) => {
    dispatch({
      type: TOGGLE_TOASTER,
      payload: {
        message: payload,
        show: true,
      },
    });

    setTimeout(() => {
      dispatch({
        type: TOGGLE_TOASTER,
        payload: {
          show: false,
          message: "",
        },
      });
    }, 3000);
  };
}

//export const apiMiddleware	 = (store) => (next) => async (action) => {
//  if (action.http) {
//    try {
//      action.result = await fetch(action.http)
//    } catch (error) {
//      // Do something
//    }
//  }
//  return next(action)
//}

//import { accessDenied, apiError, apiStart, apiEnd } from "../actions/api";
import ApiActions from "../actions/api.actions";
import UiActions from "../actions/ui.actions";
import ACTION_TYPES from "../types";

const apiMiddleware =
  ({ dispatch }) =>
  (next) =>
  (action) => {
    console.log(action);
    next(action);

    if (action.type !== ACTION_TYPES.API.REQUEST) return;

    const { serviceName, data, onSuccess, onFailure, label, key } =
      action.payload;

    // axios default configs
    //axios.defaults.baseURL = process.env.REACT_APP_BASE_URL || "";
    //axios.defaults.headers.common["Content-Type"] = "application/json";
    //axios.defaults.headers.common["Authorization"] = `Bearer${token}`;

    if (label) {
      dispatch(ApiActions.apiStart(label));
    }

    return new Promise((resolve, reject) => {
      window.icAPI.callService(serviceName, data, (error, response) => {
        if (!error) {
          dispatch(onSuccess(response.responseJSON));
          dispatch(ApiActions.apiEnd(label));
          next(action);
          resolve(response.responseJSON);
        } else {
          const rejectBody = {
            message:
              (error.responseJSON && error.responseJSON.body) ||
              "Error desconocido",
          };
          if (error.response && error.response.status === 403) {
            dispatch(ApiActions.accessDenied(window.location.pathname));
          }
          dispatch(ApiActions.apiError(rejectBody));
          dispatch(UiActions.showSnackbar(rejectBody.message, "error"));
          dispatch(onFailure(error));
          dispatch(ApiActions.apiEnd(label));
          next(action);
          reject(rejectBody);
        }
      });
    });
  };

export default apiMiddleware;

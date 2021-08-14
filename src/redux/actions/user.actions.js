import { userConstants } from "../constants";
import { alertActions } from "./alert.actions";

export const userActions = { login };

function login(email, password) {
  return (dispatch) => {
    dispatch(request({ email }));

    window.icAPI.callService(
      "userLogin",
      { email, password },
      function (error, response) {
        if (!error) {
          const { key, firstName, email } = response.responseJSON;
          dispatch(success({ key, firstName, email }));
        } else {
          dispatch(failure(error));
          dispatch(alertActions.error(error));
        }
      }
    );
  };

  function request(user) {
    return { type: userConstants.LOGIN_REQUEST, user };
  }
  function success(user) {
    return { type: userConstants.LOGIN_SUCCESS, user };
  }
  function failure(error) {
    return { type: userConstants.LOGIN_FAILURE, error };
  }
}

import UserService from "../../services/user.service";
import { userConstants } from "../constants";
import { alertActions } from "./alert.actions";

export const userActions = { login };

function login(email, password) {
  return (dispatch) => {
    dispatch(request({ email }));
    return UserService.userLogin(email, password).then(
      (response) => {
        dispatch(success(response));
        return Promise.resolve();
      },
      (error) => {
        dispatch(failure(error));
        dispatch(alertActions.error());
        return Promise.reject();
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

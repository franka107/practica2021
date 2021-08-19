import UserService from "../../services/user.service";
import { userConstants } from "../types/user.constants";
import { alertActions } from "./alert.actions";
import UiActions from "./ui.actions";

export const userActions = { login, register };

function register(userData) {
  return (dispatch) => {
    return UserService.userRegister(userData).then(
      (response) => {
        dispatch(success(response));
        return Promise.resolve();
      },
      (error) => {
        dispatch(failure(error));
        dispatch(alertActions.error());
        dispatch(UiActions.showSnackbar(error.message, "error"));
        return Promise.reject();
      }
    );
  };
  function success(user) {
    return { type: userConstants.USER_REGISTER_SUCCESS, user };
  }
  function failure(error) {
    return { type: userConstants.USER_REGISTER_FAILURE, error };
  }
}

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

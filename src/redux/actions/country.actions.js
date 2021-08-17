import CountryService from "../../services/country.service";
import UserService from "../../services/user.service";
import { userConstants } from "../constants";
import { alertActions } from "./alert.actions";
import { uiActions } from "./ui.actions";

export const countryActions = { listAll };

function listAll() {
  return (dispatch) => {
    dispatch(request());
    return CountryService.countryList().then(
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

  function request() {
    return { type: userConstants.LOGIN_REQUEST };
  }
  function success(countries) {
    return { type: userConstants.LOGIN_SUCCESS, countries };
  }
  function failure(error) {
    return { type: userConstants.LOGIN_FAILURE, error };
  }
}

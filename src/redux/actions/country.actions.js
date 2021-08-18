import CountryService from "../../services/country.service";
import { countryConstans } from "../constants/country.constants";
import { alertActions } from "./alert.actions";

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
    return { type: countryConstans.GETALL_REQUEST };
  }
  function success(countries) {
    return { type: countryConstans.GETALL_SUCCESS, countries };
  }
  function failure(error) {
    return { type: countryConstans.GETALL_FAILURE, error };
  }
}

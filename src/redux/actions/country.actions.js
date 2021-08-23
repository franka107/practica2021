import CountryService from "../../services/country.service";
import { countryConstans } from "../types/country.constants";
import { alertActions } from "./alert.actions";

export const countryActions = { retrieveCountries };

function retrieveCountries() {
  return (dispatch) => {
    dispatch(request());
    return CountryService.getAll().then(
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
  function success(payload) {
    return { type: countryConstans.GETALL_SUCCESS, payload };
  }
  function failure(error) {
    return { type: countryConstans.GETALL_FAILURE, error };
  }
}

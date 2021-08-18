import CountryService from "../../services/country.service";
import FarmService from "../../services/farm.service";
import { farmConstants } from "../constants/farm.constants";
import { alertActions } from "./alert.actions";

export const farmActions = { create };

function create(data) {
  return (dispatch) => {
    dispatch(request());
    return FarmService.farmCreate(data).then(
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
    return { type: farmConstants.CREATE_REQUEST };
  }
  function success(farm) {
    return { type: farmConstants.CREATE_SUCCESS, farm };
  }
  function failure(error) {
    return { type: farmConstants.CREATE_FAILURE, error };
  }
}

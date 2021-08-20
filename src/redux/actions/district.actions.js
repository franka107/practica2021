import DistrictService from "../../services/district.service";
import { districtConstants } from "../types/district.constants";
import { alertActions } from "./alert.actions";

export const districtActions = { retrieveDistricts };

function retrieveDistricts() {
  return (dispatch) => {
    dispatch(request());
    return DistrictService.getAll().then(
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
    return { type: districtConstants.GETALL_REQUEST };
  }
  function success(payload) {
    return { type: districtConstants.GETALL_SUCCESS, payload };
  }
  function failure(error) {
    return { type: districtConstants.GETALL_FAILURE, error };
  }
}

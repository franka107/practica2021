import DistrictService from "../../services/district.service";
import { districtConstants } from "../types/district.constants";
import { alertActions } from "./alert.actions";

export const districtActions = { listAll };

function listAll() {
  return (dispatch) => {
    dispatch(request());
    return DistrictService.districtList().then(
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
  function success(districts) {
    return { type: districtConstants.GETALL_SUCCESS, districts };
  }
  function failure(error) {
    return { type: districtConstants.GETALL_FAILURE, error };
  }
}

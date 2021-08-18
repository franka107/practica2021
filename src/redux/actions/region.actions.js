import RegionService from "../../services/region.service";
import { regionConstants } from "../constants/region.constants";
import { alertActions } from "./alert.actions";

export const regionActions = { listAll };

function listAll() {
  return (dispatch) => {
    dispatch(request());
    return RegionService.regionList().then(
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
    return { type: regionConstants.GETALL_REQUEST };
  }
  function success(regions) {
    return { type: regionConstants.GETALL_SUCCESS, regions };
  }
  function failure(error) {
    return { type: regionConstants.GETALL_FAILURE, error };
  }
}

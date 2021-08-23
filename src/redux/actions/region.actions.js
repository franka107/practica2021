import RegionService from "../../services/region.service";
import { regionConstants } from "../types/region.constants";
import { alertActions } from "./alert.actions";

export const regionActions = { retrieveRegions };

function retrieveRegions() {
  return (dispatch) => {
    dispatch(request());
    return RegionService.getAll().then(
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
  function success(payload) {
    return { type: regionConstants.GETALL_SUCCESS, payload };
  }
  function failure(error) {
    return { type: regionConstants.GETALL_FAILURE, error };
  }
}

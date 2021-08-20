import CountryService from "../../services/country.service";
import FarmService from "../../services/farm.service";
import ACTION_TYPES from "../types";
import { farmConstants } from "../types/farm.constants";
import { alertActions } from "./alert.actions";

export const farmActions = { create, findFarmByOwnerId };

function findFarmByOwnerId(ownerId) {
  return (dispatch) => {
    return FarmService.findByOwnerId(ownerId).then(
      ({ agribusiness, ...response }) => {
        dispatch({
          type: ACTION_TYPES.FARM.RETRIEVE_BY_OWNER_ID,
          payload: response,
        });
        dispatch({
          type: ACTION_TYPES.AGRIBUSINESS.RETRIEVE,
          payload: agribusiness,
        });
        dispatch({
          type: ACTION_TYPES.AGRIBUSINESS.UPDATE,
          payload: agribusiness && agribusiness[0],
        });
      }
    );
  };
}
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
  function success(payload) {
    return { type: farmConstants.CREATE_SUCCESS, payload };
  }
  function failure(error) {
    return { type: farmConstants.CREATE_FAILURE, error };
  }
}

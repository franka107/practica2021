import FarmService from "../../services/farm.service";
import ACTION_TYPES from "../types";
import { farmConstants } from "../types/farm.constants";
import { alertActions } from "./alert.actions";

export const farmActions = { create, findFarmByOwnerId, clearAll };

function findFarmByOwnerId(ownerId) {
  return (dispatch) => {
    return FarmService.findByOwnerId(ownerId).then((response) => {
      let localAgribusiness = JSON.parse(localStorage.getItem("agribusiness"));

      dispatch({
        type: ACTION_TYPES.FARM.RETRIEVE_BY_OWNER_ID,
        payload: response,
      });
      dispatch({
        type: ACTION_TYPES.AGRIBUSINESS.RETRIEVE,
        payload: response && response.agribusiness,
      });
      dispatch({
        type: ACTION_TYPES.AGRIBUSINESS.UPDATE_CURRENT,
        payload:
          localAgribusiness ||
          (response && response.agribusiness && response.agribusiness[0]),
      });
      return Promise.resolve(response);
    });
  };
}

function clearAll() {
  return (dispatch) => {
    dispatch({ type: ACTION_TYPES.FARM.CLEAR_ALL });
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

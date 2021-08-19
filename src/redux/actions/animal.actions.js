import AnimalService from "../../services/animal.service";
import { animalConstans } from "../types/animal.constants";
import { alertActions } from "./alert.actions";
import UiActions from "./ui.actions";

export const animalActions = { listAll, listById, deleteElement };

function listAll() {
  return (dispatch) => {
    dispatch(request());
    return AnimalService.animalList().then(
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
    return { type: animalConstans.GETALL_REQUEST };
  }
  function success(animals) {
    return { type: animalConstans.GETALL_SUCCESS, animals };
  }
  function failure(error) {
    return { type: animalConstans.GETALL_FAILURE, error };
  }
}

function listById(data) {
  return (dispatch) => {
    return AnimalService.animalGetById(data).then(
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

  function success(animals) {
    return { type: animalConstans.GETBYID_SUCCESS, animals };
  }
  function failure(error) {
    return { type: animalConstans.GETBYID_FAILURE, error };
  }
}

function deleteElement(data) {
  return (dispatch) => {
    return AnimalService.animalDelete(data).then(
      (response) => {
        dispatch(success(response));
        dispatch(listAll());
        dispatch(UiActions.showSnackbar("Se eliminó el registro exitosamente"));
        return Promise.resolve();
      },
      (error) => {
        dispatch(failure(error));
        dispatch(alertActions.error());
        return Promise.reject();
      }
    );
  };

  function success(confirmation) {
    return { type: animalConstans.DELETE_SUCCESS, confirmation };
  }
  function failure(error) {
    return { type: animalConstans.DELETE_FAILURE, error };
  }
}

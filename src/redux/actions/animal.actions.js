import AnimalService from "../../services/animal.service";
import ACTION_TYPES from "../types";
import { animalConstans } from "../types/animal.constants";
import { alertActions } from "./alert.actions";
import UiActions from "./ui.actions";

export const animalActions = {
  listAll,
  listById,
  deleteElement,
  createElement,
  updateElement,
};

function listAll() {
  return (dispatch, getState) => {
    const { agribusiness } = getState();
    dispatch(request());
    return AnimalService.animalList({
      agribusinessId: agribusiness.current._id,
    }).then(
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
        console.log(response);
        dispatch({
          type: ACTION_TYPES.ANIMAL.UPDATE_CURRENT,
          payload: response,
        });
        return Promise.resolve();
      },
      (error) => {
        dispatch(failure(error));
        dispatch(alertActions.error());
        return Promise.reject();
      }
    );
  };

  //function success(payload) {
  //  return { type: ACTION_TYPES.ANIMAL.UPDATE_CURRENT, payload };
  //}
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

function createElement(data) {
  return (dispatch) => {
    return AnimalService.animalCreate(data).then(
      (response) => {
        dispatch(success(response));
        dispatch(listAll());
        dispatch(UiActions.showSnackbar("El registro de creo exitosamente"));
        return Promise.resolve();
      },
      (error) => {
        dispatch(failure(error));
        UiActions.showSnackbar(
          "Ocurrio un error al crear el registro",
          "error"
        );
        return Promise.reject();
      }
    );
  };

  function success(animals) {
    return { type: animalConstans.CREATE_SUCCESS, animals };
  }
  function failure(error) {
    return { type: animalConstans.CREATE_FAILURE, error };
  }
}

function updateElement(data) {
  return (dispatch) => {
    return AnimalService.animalUpdate(data).then(
      (response) => {
        dispatch(success(response));
        dispatch(listAll());
        dispatch(
          UiActions.showSnackbar("El registro se actualizo exitosamente")
        );
        return Promise.resolve();
      },
      (error) => {
        dispatch(failure(error));
        dispatch(UiActions.showSnackbar(error.message, "error"));
        return Promise.reject();
      }
    );
  };

  function success(animals) {
    return { type: animalConstans.UPDATE_SUCCESS, animals };
  }
  function failure(error) {
    return { type: animalConstans.UPDATE_FAILURE, error };
  }
}

import AnimalService from "../../services/animal.service";
import ACTION_TYPES from "../types";
import UiActions from "./ui.actions";

class AnimalActions {
  listAll() {
    return (dispatch, getState) => {
      const { agribusiness } = getState();

      return AnimalService.animalList({
        agribusinessId: agribusiness.current._id,
      }).then(
        (response) => {
          dispatch({
            type: ACTION_TYPES.ANIMAL.RETRIEVE,
            payload: response,
          });
          return Promise.resolve();
        },
        (error) => {
          return Promise.reject();
        }
      );
    };
  }

  listById(data) {
    return (dispatch) => {
      return AnimalService.animalGetById(data).then(
        (response) => {
          console.log(response);
          dispatch({
            type: ACTION_TYPES.ANIMAL.RETRIEVE_BY_ID,
            payload: response,
          });
          return Promise.resolve();
        },
        (error) => {
          return Promise.reject();
        }
      );
    };
  }

  deleteElement(data) {
    return (dispatch) => {
      return AnimalService.animalDelete(data).then(
        (response) => {
          dispatch(
            UiActions.showSnackbar("Se eliminó el registro exitosamente")
          );
          return Promise.resolve();
        },
        (error) => {
          return Promise.reject();
        }
      );
    };
  }

  createElement(data) {
    return (dispatch) => {
      return AnimalService.animalCreate(data).then(
        (response) => {
          dispatch({
            type: ACTION_TYPES.ANIMAL.CREATE,
            payload: response,
          });
          dispatch(UiActions.showSnackbar("El registro de creo exitosamente"));
          return Promise.resolve();
        },
        (error) => {
          dispatch(UiActions.showSnackbar(error.message, "error"));
          return Promise.reject();
        }
      );
    };
  }

  updateElement(data) {
    return (dispatch) => {
      return AnimalService.animalUpdate(data).then(
        (response) => {
          dispatch({
            type: ACTION_TYPES.ANIMAL.UPDATE,
            payload: response,
          });
          dispatch(
            UiActions.showSnackbar("El registro se actualizo exitosamente")
          );
          return Promise.resolve();
        },
        (error) => {
          dispatch(UiActions.showSnackbar(error.message, "error"));
          return Promise.reject();
        }
      );
    };
  }
}

export default new AnimalActions();

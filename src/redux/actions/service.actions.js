import ServiceService from "../../services/service.service";
import ACTION_TYPES from "../types";
import UiActions from "./ui.actions";

class ServiceActions {
  listByAgribusiness() {
    return (dispatch, getState) => {
      const { agribusiness } = getState();
      return ServiceService.serviceListByAgribusiness({
        agribusinessId: agribusiness.current._id,
      }).then(
        (response) => {
          dispatch({
            type: ACTION_TYPES.SERVICE.RETRIEVE_BY_CURRENCY,
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
      return ServiceService.serviceGetById(data).then(
        (response) => {
          dispatch({
            type: ACTION_TYPES.SERVICE.RETRIEVE_BY_ID,
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

  create(data) {
    return (dispatch) => {
      return ServiceService.serviceCreate(data).then(
        (response) => {
          dispatch({
            type: ACTION_TYPES.SERVICE.CREATE,
            payload: response,
          });
          dispatch(UiActions.showSnackbar("El registro de creo exitosamente"));
          return Promise.resolve();
        },
        (error) => {
          dispatch(UiActions.showSnackbar("Ocurrio un error", "error"));
          return Promise.reject();
        }
      );
    };
  }

  update(data) {
    return (dispatch) => {
      return ServiceService.serviceUpdate(data).then(
        (response) => {
          dispatch({
            type: ACTION_TYPES.SERVICE.UPDATE,
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

  clearCurrent() {
    return (dispatch) => {
      dispatch({
        type: ACTION_TYPES.SERVICE.UPDATE_CURRENT,
        payload: null,
      });
    };
  }

  delete(dataDelete) {
    return (dispatch) => {
      return ServiceService.serviceDelete(dataDelete).then(
        (response) => {
          dispatch({
            type: ACTION_TYPES.SERVICE.DELETE,
            payload: response,
          });
          dispatch(
            UiActions.showSnackbar("Se eliminó el registro exitosamente")
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

export default new ServiceActions();

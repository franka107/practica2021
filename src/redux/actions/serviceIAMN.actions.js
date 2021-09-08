import ServiceIAMNService from "../../services/serviceIAMN.service";
import ACTION_TYPES from "../types";
import UiActions from "./ui.actions";

class ServiceIAMNActions {
  listByAgribusiness() {
    return (dispatch, getState) => {
      // const { agribusiness } = getState();
      // {
      //   agribusinessId: agribusiness.current._id,
      // }
      return ServiceIAMNService.serviceIAMNListByAgribusiness().then(
        (response) => {
          dispatch({
            type: ACTION_TYPES.SERVICEIAMN.RETRIEVE_BY_CURRENCY,
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
      return ServiceIAMNService.serviceIAMNGetById(data).then(
        (response) => {
          dispatch({
            type: ACTION_TYPES.SERVICEIAMN.RETRIEVE_BY_ID,
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
      return ServiceIAMNService.serviceIAMNCreate(data).then(
        (response) => {
          dispatch({
            type: ACTION_TYPES.SERVICEIAMN.CREATE,
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
      return ServiceIAMNService.serviceIAMNUpdate(data).then(
        (response) => {
          dispatch({
            type: ACTION_TYPES.SERVICEIAMN.UPDATE,
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
        type: ACTION_TYPES.SERVICEIAMN.UPDATE_CURRENT,
        payload: null,
      });
    };
  }

  delete(dataDelete) {
    return (dispatch) => {
      return ServiceIAMNService.serviceIAMNDelete(dataDelete).then(
        (response) => {
          dispatch({
            type: ACTION_TYPES.SERVICEIAMN.DELETE,
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

export default new ServiceIAMNActions();

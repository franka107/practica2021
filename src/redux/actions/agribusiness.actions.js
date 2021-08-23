import AgribusinessService from "../../services/agribusiness.service";
import ACTION_TYPES from "../types";
import uiActions from "./ui.actions";

class AgribusinessActions {
  createAgribusiness(data) {
    return (dispatch) => {
      return AgribusinessService.create(data).then(
        (response) => {
          dispatch(
            uiActions.showSnackbar("Tu agronegocio fue creado exitosamente")
          );
          dispatch({
            type: ACTION_TYPES.AGRIBUSINESS.CREATE,
            payload: response,
          });
          return Promise.resolve();
        },
        (error) => {
          dispatch(uiActions.showSnackbar(error.message, "error"));
          return Promise.reject();
        }
      );
    };
  }

  setCurrentAgribusiness(data) {
    return (dispatch) => {
      localStorage.setItem("agribusiness", JSON.stringify(data));
      dispatch({
        type: ACTION_TYPES.AGRIBUSINESS.UPDATE_CURRENT,
        payload: data,
      });
    };
  }
}

export default new AgribusinessActions();

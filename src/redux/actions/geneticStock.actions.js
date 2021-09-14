import GeneticStockService from "../../services/geneticStock.service";
import ACTION_TYPES from "../types";
import UiActions from "./ui.actions";

class GeneticStockActions {
  listGeneticStockByAgribusiness(data) {
    return (dispatch, getState) => {
      const { agribusiness } = getState();

      return GeneticStockService.geneticStockListByAgribusiness({
        ...data,
        agribusinessId: agribusiness.current?._id,
      }).then(
        (response) => {
          dispatch({
            type: ACTION_TYPES.GENETICSTOCK.RETRIEVE_BY_CURRENCY,
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
  createGenticStock(data, geneticType) {
    return (dispatch, getState) => {
      const agribusiness = getState().agribusiness.current;
      return GeneticStockService.geneticStockCreate({
        ...data,
        agribusinessId: agribusiness._id,
      }).then(
        (response) => {
          dispatch({
            type: ACTION_TYPES.GENETICSTOCK.CREATE,
            payload: {
              ...response,
              totalValue: response.stock * response.value,
            },
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

  getById(data) {
    return (dispatch) => {
      return GeneticStockService.geneticStockGetById(data).then(
        (response) => {
          dispatch({
            type: ACTION_TYPES.GENETICSTOCK.RETRIEVE_BY_ID,
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

  updateGeneticStock(data) {
    return (dispatch) => {
      return GeneticStockService.geneticStockUpdate(data).then(
        (response) => {
          dispatch({
            type: ACTION_TYPES.GENETICSTOCK.UPDATE,
            payload: response,
          });
          dispatch(
            UiActions.showSnackbar("El registro se actualizo exitosamente")
          );
          dispatch(this.listGeneticStockByAgribusiness());
          return Promise.resolve();
        },
        (error) => {
          dispatch(UiActions.showSnackbar(error.message, "error"));
          return Promise.reject();
        }
      );
    };
  }

  clearCurrentGenticStock() {
    return (dispatch) => {
      dispatch({
        type: ACTION_TYPES.GENETICSTOCK.UPDATE_CURRENT,
        payload: null,
      });
    };
  }

  deleteGenticStock(dataDelete) {
    return (dispatch) => {
      return GeneticStockService.geneticStockDelete(dataDelete).then(
        (response) => {
          dispatch({
            type: ACTION_TYPES.GENETICSTOCK.DELETE,
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

export default new GeneticStockActions();

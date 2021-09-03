import GeneticStockService from "../../services/geneticStock.service";
import ACTION_TYPES from "../types";

class GeneticStockActions {
  listGeneticStockByAgribusiness(data) {
    return (dispatch, getState) => {
      const { agribusiness } = getState();

      return GeneticStockService.geneticStockListByAgribusiness({
        ...data,
        agribusinessId: agribusiness.current._id,
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
  createGenticStock(data) {
    return (dispatch) => {
      return GeneticStockService.geneticStockCreate(data).then(
        (response) => {
          dispatch({
            type: ACTION_TYPES.GENETICSTOCK.CREATE,
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

  listGeneticStockById(data) {
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
          return Promise.resolve();
        },
        (error) => {
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
          return Promise.resolve();
        },
        (error) => {
          return Promise.reject();
        }
      );
    };
  }
}

export default new GeneticStockActions();

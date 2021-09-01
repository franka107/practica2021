import GeneticStockService from "../../services/geneticStock.service";
import ACTION_TYPES from "../types";

class GeneticStockActions {
  listGeneticStock() {
    return (dispatch) => {
      return GeneticStockService.geneticStockList().then(
        (response) => {
          dispatch({
            type: ACTION_TYPES.GENETICSTOCK.RETRIEVE,
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
}

export default new GeneticStockActions();

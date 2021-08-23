import CurrencyService from "../../services/currency.service";
import ACTION_TYPES from "../types";

class CurrencyActions {
  retrieveCurrencies() {
    return (dispatch) => {
      return CurrencyService.getAll().then((response) => {
        dispatch({ type: ACTION_TYPES.CURRENCY.RETRIEVE, payload: response });
      });
    };
  }
  createCurrency() {}
  updateCurrency() {}
  deleteCurrency() {}
  findCurrencyById(_id) {
    return (dispatch) => {
      return CurrencyService.get(_id).then((response) => {
        dispatch({
          type: ACTION_TYPES.CURRENCY.RETRIEVE_BY_ID,
          payload: response,
        });
      });
    };
  }
  deleteAllCurrencies() {}
  findCurrencyByName() {}
}

export default new CurrencyActions();

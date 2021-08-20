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
  deleteAllCurrencies() {}
  findCurrencyByName() {}
}

export default new CurrencyActions();

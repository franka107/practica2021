import ACTION_TYPES from "../types";

export function currencyReducer(state = { list: [] }, action) {
  switch (action.type) {
    case ACTION_TYPES.CURRENCY.RETRIEVE:
      return {
        ...state,
        list: action.payload,
      };
    case ACTION_TYPES.CURRENCY.RETRIEVE_BY_ID:
      return {
        ...state,
        current: action.payload,
      };
    default:
      return state;
  }
}

import ACTION_TYPES from "../types";

const initialState = { list: [], current: null };

export function geneticStockReducer(state = initialState, action) {
  switch (action.type) {
    case ACTION_TYPES.GENETICSTOCK.RETRIEVE_BY_CURRENCY:
      return {
        ...state,
        list: action.payload,
      };
    case ACTION_TYPES.GENETICSTOCK.RETRIEVE_BY_ID:
      return {
        ...state,
        current: action.payload,
      };
    case ACTION_TYPES.GENETICSTOCK.UPDATE_CURRENT:
      return {
        ...state,
        current: null,
      };
    case ACTION_TYPES.GENETICSTOCK.UPDATE:
      return {
        ...state,
        current: null,
      };
    case ACTION_TYPES.GENETICSTOCK.CREATE:
      return {
        ...state,
        list: [action.payload, ...state.list],
        current: action.payload,
      };
    case ACTION_TYPES.GENETICSTOCK.DELETE:
      return state;
    default:
      return state;
  }
}

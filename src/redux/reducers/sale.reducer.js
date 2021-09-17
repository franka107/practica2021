import ACTION_TYPES from "../types";

const initialState = { list: [], current: null };

export function saleReducer(state = initialState, action) {
  switch (action.type) {
    case ACTION_TYPES.SALE.RETRIEVE:
      return {
        ...state,
        list: action.payload,
      };
    case ACTION_TYPES.SALE.RETRIEVE_BY_ID:
      return {
        ...state,
        current: action.payload,
      };
    case ACTION_TYPES.SALE.CREATE:
      return {
        ...state,
        list: [...state.list, action.payload],
      };
    case ACTION_TYPES.SALE.UPDATE_CURRENT:
      return {
        ...state,
        current: action.payload,
      };
    case ACTION_TYPES.SALE.DELETE:
      return state;
    default:
      return state;
  }
}

import ACTION_TYPES from "../types";

const initialState = { list: [], current: null };

export function geneticStockReducer(state = initialState, action) {
  switch (action.type) {
    case ACTION_TYPES.GENETICSTOCK.RETRIEVE:
      return {
        ...state,
        list: action.payload,
      };
    case ACTION_TYPES.GENETICSTOCK.CREATE:
      return state;
    default:
      return state;
  }
}

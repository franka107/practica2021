import ACTION_TYPES from "../types";

const initialState = { list: [], current: null };

export function weightReducer(state = initialState, action) {
  switch (action.type) {
    case ACTION_TYPES.WEIGHT.RETRIEVE:
      return {
        ...state,
        list: action.payload,
      };
    case ACTION_TYPES.WEIGHT.RETRIEVE_BY_ID:
      return {
        ...state,
        current: action.payload,
      };
    case ACTION_TYPES.WEIGHT.CREATE:
      return {
        ...state,
        list: [action.payload, ...state.list],
      };
    case ACTION_TYPES.WEIGHT.UPDATE_CURRENT:
      return {
        ...state,
        current: action.payload,
      };
    case ACTION_TYPES.WEIGHT.DELETE:
      return state;
    default:
      return state;
  }
}

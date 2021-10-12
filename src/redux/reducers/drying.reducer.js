import ACTION_TYPES from "../types";

const initialState = { list: [], current: null };

export function dryingReducer(state = initialState, action) {
  switch (action.type) {
    case ACTION_TYPES.DRYING.RETRIEVE:
      return {
        ...state,
        list: action.payload,
      };
    case ACTION_TYPES.DRYING.RETRIEVE_BY_ID:
      return {
        ...state,
        current: action.payload,
      };
    case ACTION_TYPES.DRYING.CREATE:
      return {
        ...state,
        list: [action.payload, ...state.list],
      };
    case ACTION_TYPES.DRYING.UPDATE_CURRENT:
      return {
        ...state,
        current: action.payload,
      };
    case ACTION_TYPES.DRYING.DELETE:
      return state;
    default:
      return state;
  }
}

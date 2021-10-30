import ACTION_TYPES from "../types";

const initialState = { list: [], current: null };

export function serviceReducer(state = initialState, action) {
  switch (action.type) {
    case ACTION_TYPES.SERVICE.RETRIEVE_BY_CURRENCY:
      return {
        ...state,
        list: action.payload,
      };
    case ACTION_TYPES.SERVICE.RETRIEVE_BY_ID:
      return {
        ...state,
        current: action.payload,
      };
    case ACTION_TYPES.SERVICE.UPDATE_CURRENT:
      return {
        ...state,
        current: null,
      };
    case ACTION_TYPES.SERVICE.UPDATE:
      return {
        ...state,
        current: null,
      };
    case ACTION_TYPES.SERVICE.CREATE:
      return state;
    case ACTION_TYPES.SERVICE.DELETE:
      return state;
    default:
      return state;
  }
}

import ACTION_TYPES from "../types";

const initialState = { list: [], current: null };

export function serviceIAMNReducer(state = initialState, action) {
  switch (action.type) {
    case ACTION_TYPES.SERVICEIAMN.RETRIEVE_BY_CURRENCY:
      return {
        ...state,
        list: action.payload,
      };
    case ACTION_TYPES.SERVICEIAMN.RETRIEVE_BY_ID:
      return {
        ...state,
        current: action.payload,
      };
    case ACTION_TYPES.SERVICEIAMN.UPDATE_CURRENT:
      return {
        ...state,
        current: null,
      };
    case ACTION_TYPES.SERVICEIAMN.UPDATE:
      return {
        ...state,
        current: null,
      };
    case ACTION_TYPES.SERVICEIAMN.CREATE:
      return state;
    case ACTION_TYPES.SERVICEIAMN.DELETE:
      return state;
    default:
      return state;
  }
}

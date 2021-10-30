import ACTION_TYPES from "../types";

const initialState = { list: [], current: null };

export function associationReducer(state = initialState, action) {
  switch (action.type) {
    case ACTION_TYPES.ASSOCIATION.RETRIEVE:
      return {
        ...state,
        list: action.payload,
      };
    case ACTION_TYPES.ASSOCIATION.RETRIEVE_BY_ID:
      return {
        ...state,
        current: action.payload,
      };
    case ACTION_TYPES.ASSOCIATION.CREATE:
      return {
        ...state,
        list: [action.payload, ...state.list],
      };
    case ACTION_TYPES.ASSOCIATION.UPDATE_CURRENT:
      return {
        ...state,
        current: action.payload,
      };
    case ACTION_TYPES.ASSOCIATION.DELETE:
      return state;
    default:
      return state;
  }
}

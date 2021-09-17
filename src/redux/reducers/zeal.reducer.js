import ACTION_TYPES from "../types";

const initialState = { list: [], current: null };

export function zealReducer(state = initialState, action) {
  switch (action.type) {
    case ACTION_TYPES.ZEAL.RETRIEVE:
      return {
        ...state,
        list: action.payload,
      };
    case ACTION_TYPES.ZEAL.RETRIEVE_BY_ID:
      return {
        ...state,
        current: action.payload,
      };
    case ACTION_TYPES.ZEAL.CREATE:
      return {
        ...state,
        list: [...state.list, action.payload],
      };
    case ACTION_TYPES.ZEAL.UPDATE_CURRENT:
      return {
        ...state,
        current: action.payload,
      };
    case ACTION_TYPES.ZEAL.DELETE:
      return state;
    default:
      return state;
  }
}

import ACTION_TYPES from "../types";

const initialState = { list: [], current: null };

export function palpationReducer(state = initialState, action) {
  switch (action.type) {
    case ACTION_TYPES.PALPATION.RETRIEVE:
      return {
        ...state,
        list: action.payload,
      };
    case ACTION_TYPES.PALPATION.RETRIEVE_BY_ID:
      return {
        ...state,
        current: action.payload,
      };
    case ACTION_TYPES.PALPATION.CREATE:
      return {
        ...state,
        list: [...state.list, action.payload],
      };
    case ACTION_TYPES.PALPATION.UPDATE_CURRENT:
      return {
        ...state,
        current: action.payload,
      };
    case ACTION_TYPES.PALPATION.DELETE:
      return state;
    default:
      return state;
  }
}

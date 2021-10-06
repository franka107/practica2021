import ACTION_TYPES from "../types";
const initialState = { list: [], current: null };

export function birthReducer(state = initialState, action) {
  switch (action.type) {
    case ACTION_TYPES.BIRTH.CREATE:
      return {
        ...state,
        list: [...state.list, action.payload],
        current: action.payload,
      };
    case ACTION_TYPES.BIRTH.RETRIEVE_LIST:
      return {
        ...state,
        list: action.payload,
      };
    case ACTION_TYPES.BIRTH.UPDATE_CURRENT:
      return {
        ...state,
        current: action.payload,
      };
    case ACTION_TYPES.BIRTH.DELETE:
      return state;

    default:
      return state;
  }
}

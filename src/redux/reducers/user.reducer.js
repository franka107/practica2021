import ACTION_TYPES from "../types";
const initialState = { list: [], current: null };

export function userReducer(state = initialState, action) {
  switch (action.type) {
    case ACTION_TYPES.USER.CREATE:
      return {
        ...state,
        list: [action.payload, ...state.list],
        current: action.payload,
      };
    case ACTION_TYPES.USER.RETRIEVE:
      return {
        ...state,
        list: action.payload,
      };
    case ACTION_TYPES.USER.UPDATE_CURRENT:
      return {
        ...state,
        current: action.payload,
      };
    case ACTION_TYPES.USER.DELETE:
      return state;

    default:
      return state;
  }
}

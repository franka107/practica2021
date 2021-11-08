import ACTION_TYPES from "../types";

const initialState = { list: [], current: null };

export function commentReducer(state = initialState, action) {
  switch (action.type) {
    case ACTION_TYPES.COMMENT.RETRIEVE:
      return {
        ...state,
        list: action.payload,
      };
    case ACTION_TYPES.COMMENT.RETRIEVE_BY_ID:
      return {
        ...state,
        current: action.payload,
      };
    case ACTION_TYPES.COMMENT.CREATE:
      return {
        ...state,
        list: [action.payload, ...state.list],
      };
    case ACTION_TYPES.COMMENT.UPDATE_CURRENT:
      return {
        ...state,
        current: action.payload,
      };
    case ACTION_TYPES.COMMENT.DELETE:
      return state;
    default:
      return state;
  }
}

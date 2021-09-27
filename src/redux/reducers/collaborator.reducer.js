import ACTION_TYPES from "../types";

const initialState = { list: [], current: null };

export function collaboratorReducer(state = initialState, action) {
  switch (action.type) {
    case ACTION_TYPES.COLLABORATOR.RETRIEVE:
      return {
        ...state,
        list: action.payload,
      };
    case ACTION_TYPES.COLLABORATOR.RETRIEVE_BY_ID:
      return {
        ...state,
        current: action.payload,
      };
    case ACTION_TYPES.COLLABORATOR.CREATE:
      return {
        ...state,
        list: [...state.list, action.payload],
      };
    case ACTION_TYPES.COLLABORATOR.UPDATE_CURRENT:
      return {
        ...state,
        current: action.payload,
      };
    case ACTION_TYPES.COLLABORATOR.DELETE:
      return state;
    default:
      return state;
  }
}

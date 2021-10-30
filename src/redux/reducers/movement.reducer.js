import ACTION_TYPES from "../types";

export function movementReducer(state = {}, action) {
  switch (action.type) {
    case ACTION_TYPES.MOVEMENT.CREATE:
      return {
        ...state,
        list: [action.payload, ...state.list],
        current: action.payload,
      };
    case ACTION_TYPES.MOVEMENT.RETRIEVE_LIST:
      return {
        ...state,
        list: action.payload,
      };
    case ACTION_TYPES.MOVEMENT.UPDATE_CURRENT:
      return {
        ...state,
        current: action.payload,
      };

    default:
      return state;
  }
}

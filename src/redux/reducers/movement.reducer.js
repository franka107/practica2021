import ACTION_TYPES from "../types";

export function movementReducer(state = {}, action) {
  switch (action.type) {
    case ACTION_TYPES.MOVEMENT.CREATE:
      return {
        ...state,
        list: [...state.list, action.payload],
        current: action.payload,
      };
    case ACTION_TYPES.MOVEMENT.RETRIEVE_LIST:
      return {
        ...state,
        list: action.payload,
      };
    case ACTION_TYPES.AGRIBUSINESS.UPDATE_CURRENT:
      return {
        ...state,
        current: action.payload,
      };

    default:
      return state;
  }
}

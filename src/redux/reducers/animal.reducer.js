import ACTION_TYPES from "../types";

const initialState = { list: [], current: null };

export function animalReducer(state = initialState, action) {
  switch (action.type) {
    case ACTION_TYPES.ANIMAL.RETRIEVE:
      return {
        ...state,
        list: action.payload,
      };
    case ACTION_TYPES.ANIMAL.RETRIEVE_BY_ID:
      return {
        ...state,
        current: action.payload,
      };
    case ACTION_TYPES.ANIMAL.DELETE:
      return state;
    case ACTION_TYPES.ANIMAL.CREATE:
      return state;
    case ACTION_TYPES.ANIMAL.UPDATE:
      return state;
    case ACTION_TYPES.ANIMAL.UPDATE_CURRENT:
      return {
        ...state,
        current: action.payload,
      };
    default:
      return state;
  }
}

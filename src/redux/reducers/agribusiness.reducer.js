import ACTION_TYPES from "../types";

export function agribusinessReducer(state = { list: [] }, action) {
  switch (action.type) {
    case ACTION_TYPES.AGRIBUSINESS.CREATE:
      return {
        ...state,
        current: action.payload,
      };

    case ACTION_TYPES.AGRIBUSINESS.RETRIEVE:
      return {
        ...state,
        list: action.payload,
      };

    case ACTION_TYPES.AGRIBUSINESS.UPDATE:
      return {
        ...state,
        current: action.payload,
      };
    default:
      return state;
  }
}

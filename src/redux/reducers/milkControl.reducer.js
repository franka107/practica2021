import ACTION_TYPES from "../types";

const initialState = { list: [], current: null };

export function milkControlReducer(state = initialState, action) {
  switch (action.type) {
    case ACTION_TYPES.MILKCONTROL.RETRIEVE:
      return {
        ...state,
        list: action.payload,
      };
    case ACTION_TYPES.MILKCONTROL.RETRIEVE_BY_ID:
      return {
        ...state,
        current: action.payload,
      };
    case ACTION_TYPES.MILKCONTROL.CREATE:
      return {
        ...state,
        list: [action.payload, ...state.list],
      };
    case ACTION_TYPES.MILKCONTROL.UPDATE_CURRENT:
      return {
        ...state,
        current: action.payload,
      };
    case ACTION_TYPES.MILKCONTROL.DELETE:
      return state;
    default:
      return state;
  }
}

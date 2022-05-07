import ACTION_TYPES from "../types";

const initialState = { list: [], current: null };

export function graphicReducer(state = initialState, action) {
  switch (action.type) {
    case ACTION_TYPES.GRAPHIC.RETRIEVE:
      return {
        ...state,
        current: action.payload,
      };
    default:
      return state;
  }
}

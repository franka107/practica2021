import ACTION_TYPES from "../types";

const initialState = { list: [], current: null };

export function milkGraphicReducer(state = initialState, action) {
  switch (action.type) {
    case ACTION_TYPES.MILKGRAPHIC.RETRIEVE:
      return {
        ...state,
        current: action.payload,
      };
    default:
      return state;
  }
}

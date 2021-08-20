import ACTION_TYPES from "../types";

const agribusiness = JSON.parse(localStorage.getItem("agribusiness"));
const initialState = agribusiness
  ? { list: [], current: agribusiness }
  : { list: [], current: null };

export function agribusinessReducer(state = initialState, action) {
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

    case ACTION_TYPES.AGRIBUSINESS.UPDATE_CURRENT:
      return {
        ...state,
        current: action.payload,
      };
    default:
      return state;
  }
}

import ACTION_TYPES from "../types";
import { farmConstants } from "../types/farm.constants";

export function farmReducer(state = { loading: false }, action) {
  switch (action.type) {
    case farmConstants.CREATE_SUCCESS:
      return {
        ...state,
        current: action.payload,
      };
    case farmConstants.UPDATE:
      return {
        ...state,
        current: action.payload,
      };

    case ACTION_TYPES.FARM.RETRIEVE_BY_OWNER_ID:
      return {
        ...state,
        current: action.payload,
      };
    case ACTION_TYPES.FARM.UPDATE_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case ACTION_TYPES.FARM.CLEAR_ALL:
      return {};

    default:
      return state;
  }
}

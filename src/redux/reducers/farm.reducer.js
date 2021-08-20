import ACTION_TYPES from "../types";
import { farmConstants } from "../types/farm.constants";

export function farmReducer(state = {}, action) {
  switch (action.type) {
    case farmConstants.CREATE_SUCCESS:
      return {
        ...state,
        current: action.payload,
      };

    case ACTION_TYPES.FARM.RETRIEVE_BY_OWNER_ID:
      return {
        ...state,
        current: action.payload,
      };

    default:
      return state;
  }
}

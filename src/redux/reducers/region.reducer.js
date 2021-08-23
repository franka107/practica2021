import { regionConstants } from "../types/region.constants";

export function regionReducer(state = { list: [] }, action) {
  switch (action.type) {
    case regionConstants.GETALL_SUCCESS:
      return {
        ...state,
        list: action.payload,
      };

    default:
      return state;
  }
}

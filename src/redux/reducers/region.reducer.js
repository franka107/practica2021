import { regionConstants } from "../types/region.constants";

export function regionReducer(state = {}, action) {
  switch (action.type) {
    case regionConstants.GETALL_SUCCESS:
      return {
        regions: action.regions,
      };

    default:
      return state;
  }
}

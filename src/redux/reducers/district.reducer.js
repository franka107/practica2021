import { districtConstants } from "../types/district.constants";

export function districtReducer(state = {}, action) {
  switch (action.type) {
    case districtConstants.GETALL_SUCCESS:
      return {
        districts: action.districts,
      };

    default:
      return state;
  }
}

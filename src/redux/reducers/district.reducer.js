import { districtConstants } from "../types/district.constants";

export function districtReducer(state = { list: [] }, action) {
  switch (action.type) {
    case districtConstants.GETALL_SUCCESS:
      return {
        ...state,
        list: action.payload,
      };

    default:
      return state;
  }
}

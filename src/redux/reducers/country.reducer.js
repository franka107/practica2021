import { countryConstans } from "../types/country.constants";

export function countryReducer(state = { list: [] }, action) {
  switch (action.type) {
    case countryConstans.GETALL_SUCCESS:
      return {
        ...state,
        list: action.payload,
      };

    default:
      return state;
  }
}

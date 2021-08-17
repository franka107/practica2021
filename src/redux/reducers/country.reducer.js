import { countryConstans } from "../constants/country.constants";

export function countryReducer(state = {}, action) {
  switch (action.type) {
    case countryConstans.GETALL_SUCCESS:
      return {
        countries: action.countries,
      };

    default:
      return state;
  }
}

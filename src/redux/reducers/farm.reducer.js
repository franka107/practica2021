import { farmConstants } from "../constants/farm.constants";

const farm = JSON.parse(localStorage.getItem("farm"));
const initialState = farm ? { farm: farm } : {};

export function farmReducer(state = initialState, action) {
  switch (action.type) {
    case farmConstants.CREATE_SUCCESS:
      return {
        farm: action.farm,
      };

    default:
      return state;
  }
}

import ACTION_TYPES from "../types";
import { animalConstans } from "../types/animal.constants";

export function animalReducer(state = {}, action) {
  switch (action.type) {
    case animalConstans.GETALL_SUCCESS:
      return {
        ...state,
        list: action.animals,
      };
    case animalConstans.GETBYID_SUCCESS:
      return {
        ...state,
        current: action.animals,
      };
    case animalConstans.DELETE_SUCCESS:
      return state;
    case animalConstans.CREATE_SUCCESS:
      return state;
    case animalConstans.UPDATE_SUCCESS:
      return state;
    case ACTION_TYPES.ANIMAL.UPDATE_CURRENT:
      return {
        ...state,
        current: action.payload
      }
    default:
      return state;
  }
}

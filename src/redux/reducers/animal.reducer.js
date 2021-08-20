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
    default:
      return state;
  }
}

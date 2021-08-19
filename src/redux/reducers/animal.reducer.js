import { animalConstans } from "../types/animal.constants";

export function animalReducer(state = {}, action) {
  switch (action.type) {
    case animalConstans.GETALL_SUCCESS:
      return {
        animals: action.animals,
      };
    case animalConstans.GETBYID_SUCCESS:
      return {
        animals: action.animals,
      };
    case animalConstans.DELETE_SUCCESS:
      return state;
    default:
      return state;
  }
}

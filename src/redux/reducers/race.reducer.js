import ACTION_TYPES from "../types";

const initialState = { list: [], current: null };

export function raceReducer(state = initialState, action) {
  switch (action.type) {
    case ACTION_TYPES.RACE.RETRIEVE:
      return {
        ...state,
        list: action.payload,
      };
    default:
      return state;
  }
}

import RaceService from "../../services/race.service";
import ACTION_TYPES from "../types";

class RaceActions {
  listRace() {
    return (dispatch) => {
      return RaceService.raceList().then(
        (response) => {
          dispatch({
            type: ACTION_TYPES.RACE.RETRIEVE,
            payload: response,
          });
          return Promise.resolve();
        },
        (error) => {
          return Promise.reject();
        }
      );
    };
  }
}

export default new RaceActions();

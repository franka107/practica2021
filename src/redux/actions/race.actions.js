import AgribusinessService from "../../services/race.service";
import ACTION_TYPES from "../types";
import uiActions from "./ui.actions";

class RaceActions {
  listRace() {
    return (dispatch) => {
      return AgribusinessService.raceList().then(
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

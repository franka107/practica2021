import IdeasCloudApi from "../../helpers/ideascloudApi";
import ACTION_TYPES from "../types";

const MovementActions = {
  create: (data) => async (dispatch, getState) => {
    const agribusiness = getState().agribusiness.current;
    const response = await IdeasCloudApi.fetch("movementCreate", {
      ...data,
      agribusinessId: agribusiness._id,
    });
    dispatch({ type: ACTION_TYPES.MOVEMENT.CREATE, payload: response });
  },

  list: (geneticType) => async (dispatch, getState) => {
    const agribusiness = getState().agribusiness.current;
    const response = await IdeasCloudApi.fetch("movementListByAgribusiness", {
      agribusinessId: agribusiness._id,
      geneticType,
    });

    dispatch({ type: ACTION_TYPES.MOVEMENT.RETRIEVE_LIST, payload: response });
  },
};

export default MovementActions;

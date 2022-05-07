import ACTION_TYPES from "../types";
import IdeasCloudApi from "../../helpers/ideascloudApi";

const get = () => async (dispatch, getState) => {
  const agribusiness = getState().agribusiness.current;
  const response = await IdeasCloudApi.fetch("charts", {
    agribusinessId: agribusiness?._id,
  });

  dispatch({ type: ACTION_TYPES.GRAPHIC.RETRIEVE, payload: response });
};

const GraphicActions = {
  get,
};

export default GraphicActions;

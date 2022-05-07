import ACTION_TYPES from "../types";
import IdeasCloudApi from "../../helpers/ideascloudApi";

const get = (data) => async (dispatch, getState) => {
  const agribusiness = getState().agribusiness.current;
  const response = await IdeasCloudApi.fetch("milkControlCharts", {
    ...data,
    agribusinessId: agribusiness?._id,
  });

  dispatch({ type: ACTION_TYPES.MILKGRAPHIC.RETRIEVE, payload: response });
};

const MilkGraphicActions = {
  get,
};

export default MilkGraphicActions;

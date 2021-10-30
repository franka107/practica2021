import ACTION_TYPES from "../types";
import IdeasCloudApi from "../../helpers/ideascloudApi";

const list = () => async (dispatch, getState) => {
  const agribusiness = getState().agribusiness.current;
  const response = await IdeasCloudApi.fetch(
    "weightControlListByAgribusiness",
    {
      agribusinessId: agribusiness?._id,
    }
  );

  dispatch({ type: ACTION_TYPES.WEIGHT.RETRIEVE, payload: response });
};

const get = (data) => async (dispatch) => {
  const response = await IdeasCloudApi.fetch("weightControlGetById", data);
  dispatch({
    type: ACTION_TYPES.WEIGHT.UPDATE_CURRENT,
    payload: response,
  });
};

const create = (data, animal) => async (dispatch, getState) => {
  const agribusiness = getState().agribusiness.current;
  const response = await IdeasCloudApi.fetch(
    "weightControlCreate",
    {
      ...data,
      agribusinessId: agribusiness._id,
    },
    dispatch,
    "Colectiva pesaje registrado satisfactoriamente.",
    "Error desconocido, intente nuavamente."
  );
  dispatch({
    type: ACTION_TYPES.WEIGHT.CREATE,
    payload: { ...response, animal: animal },
  });
};
const update = (data) => async (dispatch) => {
  const response = await IdeasCloudApi.fetch(
    "weightControlUpdate",
    data,
    dispatch,
    "Colectiva pesaje actualizado satisfactoriamente.",
    "Error desconocido, intente nuavamente."
  );
  dispatch({
    type: ACTION_TYPES.WEIGHT.UPDATE_CURRENT,
    payload: response,
  });
  dispatch(list());
};

const deleteWeight = (data) => async (dispatch) => {
  const response = await IdeasCloudApi.fetch(
    "weightControlDelete",
    {
      ...data,
    },
    dispatch,
    "Colectiva pesaje eliminado exitosamente.",
    "Error desconocido, intente nuavamente."
  );
  dispatch({ type: ACTION_TYPES.WEIGHT.DELETE, payload: response });
  dispatch(list());
};

const WeightActions = {
  list,
  get,
  create,
  update,
  deleteWeight,
};

export default WeightActions;

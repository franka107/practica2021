import ACTION_TYPES from "../types";
import IdeasCloudApi from "../../helpers/ideascloudApi";

const list = () => async (dispatch, getState) => {
  const agribusiness = getState().agribusiness.current;
  const response = await IdeasCloudApi.fetch("zealControlListByAgribusiness", {
    agribusinessId: agribusiness?._id,
  });

  dispatch({ type: ACTION_TYPES.ZEAL.RETRIEVE, payload: response });
};

const get = (data) => async (dispatch) => {
  const response = await IdeasCloudApi.fetch("zealControlGetById", data);
  dispatch({
    type: ACTION_TYPES.ZEAL.UPDATE_CURRENT,
    payload: response,
  });
};

const create = (data, animal) => async (dispatch, getState) => {
  const agribusiness = getState().agribusiness.current;
  const response = await IdeasCloudApi.fetch(
    "zealControlCreate",
    {
      ...data,
      agribusinessId: agribusiness._id,
    },
    dispatch,
    "Colectiva celo registrado satisfactoriamente.",
    "Error desconocido, intente nuavamente."
  );
  dispatch({
    type: ACTION_TYPES.ZEAL.CREATE,
    payload: { ...response, animal: animal },
  });
};
const update = (data) => async (dispatch) => {
  const response = await IdeasCloudApi.fetch(
    "zealControlUpdate",
    data,
    dispatch,
    "Colectiva celo actualizado satisfactoriamente.",
    "Error desconocido, intente nuavamente."
  );
  dispatch({
    type: ACTION_TYPES.ZEAL.UPDATE_CURRENT,
    payload: response,
  });
  dispatch(list());
};

const deleteZeal = (data) => async (dispatch) => {
  const response = await IdeasCloudApi.fetch(
    "zealControlDelete",
    {
      ...data,
    },
    dispatch,
    "Colectiva celo eliminado exitosamente.",
    "Error desconocido, intente nuavamente."
  );
  dispatch({ type: ACTION_TYPES.ZEAL.DELETE, payload: response });
  dispatch(list());
};

const ZealActions = {
  list,
  get,
  create,
  update,
  deleteZeal,
};

export default ZealActions;

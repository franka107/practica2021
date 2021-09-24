import IdeasCloudApi from "../../helpers/ideascloudApi";
import ACTION_TYPES from "../types";

const list = () => async (dispatch, getState) => {
  const farm = getState().farm.current;
  const response = await IdeasCloudApi.fetch("agribusinessList", {
    farmId: farm._id,
  });

  dispatch({ type: ACTION_TYPES.AGRIBUSINESS.RETRIEVE, payload: response });
};

const get = (data) => async (dispatch) => {
  const response = await IdeasCloudApi.fetch("saleControlGetById", data);
  dispatch({
    type: ACTION_TYPES.AGRIBUSINESS.UPDATE,
    payload: response,
  });
};

const create = (data) => async (dispatch, getState) => {
  const farm = getState().farm.current;
  const response = await IdeasCloudApi.fetch(
    "agribusinessCreate",
    {
      ...data,
      farmId: farm._id,
    },
    dispatch,
    "Tu agronegocio fue creado exitosamente",
    "Error desconocido, intente nuavamente."
  );
  dispatch({
    type: ACTION_TYPES.AGRIBUSINESS.CREATE,
    payload: response,
  });
};

const update = (data) => async (dispatch) => {
  const response = await IdeasCloudApi.fetch(
    "agribusinessUpdate",
    data,
    dispatch,
    "Tu agronegocio fue actualizado exitosamente",
    "Error desconocido, intente nuavamente."
  );
  dispatch({
    type: ACTION_TYPES.AGRIBUSINESS.UPDATE,
    payload: response,
  });
  dispatch(list());
};

const deleteAgribusiness = (data) => async (dispatch) => {
  const response = await IdeasCloudApi.fetch(
    "saleControlDelete",
    {
      ...data,
    },
    dispatch,
    "Tu agronegocio fue eliminado exitosamente",
    "Error desconocido, intente nuavamente."
  );
  dispatch({ type: ACTION_TYPES.SALE.DELETE, payload: response });
  dispatch(list());
};

const setCurrentAgribusiness = (data) => {
  return (dispatch) => {
    localStorage.setItem("agribusiness", JSON.stringify(data));
    dispatch({
      type: ACTION_TYPES.AGRIBUSINESS.UPDATE_CURRENT,
      payload: data,
    });
  };
};

const AgribusinessActions = {
  list,
  get,
  create,
  update,
  deleteAgribusiness,
  setCurrentAgribusiness,
};

export default AgribusinessActions;

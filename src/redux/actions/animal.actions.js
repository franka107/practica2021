import ACTION_TYPES from "../types";
import IdeasCloudApi from "../../helpers/ideascloudApi";

const list = () => async (dispatch, getState) => {
  const agribusiness = getState().agribusiness.current;
  const response = await IdeasCloudApi.fetch("animalListByAgribusinessV2", {
    agribusinessId: agribusiness?._id,
  });

  dispatch({ type: ACTION_TYPES.ANIMAL.RETRIEVE, payload: response });
};

const listDeads = () => async (dispatch, getState) => {
  const agribusiness = getState().agribusiness.current;
  const response = await IdeasCloudApi.fetch(
    "animalListDeadsByAgribusinessV2",
    {
      agribusinessId: agribusiness?._id,
    }
  );

  dispatch({ type: ACTION_TYPES.ANIMAL.RETRIEVE_DEADS, payload: response });
};

const get = (data) => async (dispatch) => {
  const response = await IdeasCloudApi.fetch("animalGetByIdV2", data);
  dispatch({ type: ACTION_TYPES.ANIMAL.UPDATE_CURRENT, payload: response });
  return response;
};

const clearCurrent = (data) => async (dispatch) => {
  dispatch({ type: ACTION_TYPES.ANIMAL.UPDATE_CURRENT, payload: null });
};

const create = (data) => async (dispatch, getState) => {
  const agribusiness = getState().agribusiness.current;
  const response = await IdeasCloudApi.fetch(
    "animalCreateV3",
    {
      ...data,
      agribusinessId: agribusiness._id,
    },
    dispatch,
    "Animal registrado satisfactoriamente.",
    "Error desconocido, intente nuavamente."
  );
  dispatch({
    type: ACTION_TYPES.ANIMAL.CREATE,
    payload: response,
  });
  // dispatch(list());
  return response;
};
const update = (data) => async (dispatch) => {
  await IdeasCloudApi.fetch(
    "animalUpdate",
    data,
    dispatch,
    "Animal actualizado satisfactoriamente.",
    "Error desconocido, intente nuavamente."
  );
  dispatch({ type: ACTION_TYPES.ANIMAL.UPDATE_CURRENT, payload: data });
  dispatch(list());
};

const deleteAnimal = (data) => async (dispatch) => {
  const response = await IdeasCloudApi.fetch(
    "animalDelete",
    {
      ...data,
    },
    dispatch,
    "Animal eliminado exitosamente.",
    "Error desconocido, intente nuavamente."
  );
  dispatch({ type: ACTION_TYPES.ANIMAL.DELETE, payload: response });
  dispatch(list());
};

const AnimalActions = {
  list,
  listDeads,
  get,
  create,
  update,
  clearCurrent,
  deleteAnimal,
};

export default AnimalActions;

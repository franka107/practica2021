import IdeasCloudApi from "../../helpers/ideascloudApi";
import ACTION_TYPES from "../types";
import AnimalActions from "./animal.actions";

const list = () => async (dispatch, getState) => {
  const agribusiness = getState().agribusiness.current;
  const response = await IdeasCloudApi.fetch("birthControlListByAgribusiness", {
    agribusinessId: agribusiness?._id,
  });

  dispatch({ type: ACTION_TYPES.BIRTH.RETRIEVE_LIST, payload: response });
};

const create = (data) => async (dispatch, getState) => {
  const agribusiness = getState().agribusiness.current;
  const animal = getState().animal.list.find((e) => e._id === data.animalId);

  const response = await IdeasCloudApi.fetch(
    "birthControlCreateV2",
    {
      ...data,
      agribusinessId: agribusiness._id,
    },
    dispatch,
    "Nacimiento registrado satisfactoriamente.",
    "Error desconocido, intente nuavamente."
  );
  dispatch({
    type: ACTION_TYPES.BIRTH.CREATE,
    payload: { ...data, animal: animal },
  });

  dispatch(AnimalActions.list());
  return response;
};
const update = (data, geneticType) => async (dispatch, getState) => {
  const response = await IdeasCloudApi.fetch(
    "birthControlUpdate",
    {
      ...data,
    },
    dispatch,
    "Nacimiento actualizado satisfactoriamente.",
    "Error desconocido, intente nuavamente."
  );
  dispatch({ type: ACTION_TYPES.BIRTH.UPDATE_CURRENT, payload: response });

  dispatch(list());
};

const get = (data) => async (dispatch) => {
  const response = await IdeasCloudApi.fetch("birthControlGetById", data);
  dispatch({ type: ACTION_TYPES.BIRTH.UPDATE_CURRENT, payload: response });
};

const BirthActions = {
  create,
  list,
  update,
  get,
};

export default BirthActions;

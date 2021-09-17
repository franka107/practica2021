import IdeasCloudApi from "../../helpers/ideascloudApi";
import ACTION_TYPES from "../types";

const list = () => async (dispatch, getState) => {
  const agribusiness = getState().agribusiness.current;
  const response = await IdeasCloudApi.fetch("birthListByAgribusiness", {
    agribusinessId: agribusiness?._id,
  });

  dispatch({ type: ACTION_TYPES.BIRTH.RETRIEVE_LIST, payload: response });
};

const create = (data, geneticType) => async (dispatch, getState) => {
  const agribusiness = getState().agribusiness.current;

  const response = await IdeasCloudApi.fetch(
    "birthCreate",
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
    payload: response,
  });
};
const update = (data, geneticType) => async (dispatch, getState) => {
  const response = await IdeasCloudApi.fetch(
    "birthUpdate",
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
  const response = await IdeasCloudApi.fetch("birthGetById", data);
  dispatch({ type: ACTION_TYPES.BIRTH.UPDATE_CURRENT, payload: response });
};

const MovementActions = {
  create,
  list,
  update,
  get,
};

export default MovementActions;

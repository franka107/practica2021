import ACTION_TYPES from "../types";
import IdeasCloudApi from "../../helpers/ideascloudApi";
import AnimalActions from "./animal.actions";

const list = () => async (dispatch, getState) => {
  const agribusiness = getState().agribusiness.current;
  const response = await IdeasCloudApi.fetch(
    "palpationControlListByAgribusiness",
    {
      agribusinessId: agribusiness?._id,
    }
  );

  dispatch({ type: ACTION_TYPES.PALPATION.RETRIEVE, payload: response });
};

const get = (data) => async (dispatch) => {
  const response = await IdeasCloudApi.fetch("palpationControlGetById", data);
  dispatch({
    type: ACTION_TYPES.PALPATION.UPDATE_CURRENT,
    payload: response,
  });
};

const create = (data, animal, user) => async (dispatch, getState) => {
  const agribusiness = getState().agribusiness.current;
  await IdeasCloudApi.fetch(
    "palpationControlCreate",
    {
      ...data,
      agribusinessId: agribusiness._id,
    },
    dispatch,
    "Control de palpacion registrado satisfactoriamente.",
    "Error desconocido, intente nuavamente."
  );
  dispatch(AnimalActions.list());

  console.log("antes");
  dispatch({
    type: ACTION_TYPES.PALPATION.CREATE,
    payload: { ...data, animal: animal, user: user },
  });
  console.log("despues");
};
const update = (data) => async (dispatch) => {
  const response = await IdeasCloudApi.fetch(
    "palpationControlUpdate",
    data,
    dispatch,
    "Control de palpacion actualizado satisfactoriamente.",
    "Error desconocido, intente nuavamente."
  );
  dispatch({
    type: ACTION_TYPES.PALPATION.UPDATE_CURRENT,
    payload: response,
  });
  dispatch(list());
};

const deletePalpation = (data) => async (dispatch) => {
  const response = await IdeasCloudApi.fetch(
    "palpationControlDelete",
    {
      ...data,
    },
    dispatch,
    "Control de palpacion eliminado exitosamente.",
    "Error desconocido, intente nuavamente."
  );
  dispatch({ type: ACTION_TYPES.PALPATION.DELETE, payload: response });
  dispatch(list());
};

const PalpationActions = {
  list,
  get,
  create,
  update,
  deletePalpation,
};

export default PalpationActions;

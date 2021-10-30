import ACTION_TYPES from "../types";
import IdeasCloudApi from "../../helpers/ideascloudApi";

const list = () => async (dispatch, getState) => {
  const agribusiness = getState().agribusiness.current;
  const response = await IdeasCloudApi.fetch("milkControlListByAgribusiness", {
    agribusinessId: agribusiness?._id,
  });

  dispatch({ type: ACTION_TYPES.MILKCONTROL.RETRIEVE, payload: response });
};

const get = (data) => async (dispatch) => {
  const response = await IdeasCloudApi.fetch("milkControlGetById", data);
  dispatch({
    type: ACTION_TYPES.MILKCONTROL.UPDATE_CURRENT,
    payload: response,
  });
};

const create = (data, animal) => async (dispatch, getState) => {
  const agribusiness = getState().agribusiness.current;
  const response = await IdeasCloudApi.fetch(
    "milkControlCreate",
    {
      ...data,
      agribusinessId: agribusiness._id,
    },
    dispatch,
    "Control lechero registrado satisfactoriamente.",
    "Error desconocido, intente nuavamente."
  );
  dispatch({
    type: ACTION_TYPES.MILKCONTROL.CREATE,
    payload: { ...response, animal: animal },
  });
};
const update = (data) => async (dispatch) => {
  const response = await IdeasCloudApi.fetch(
    "milkControlUpdate",
    data,
    dispatch,
    "Control lechero actualizado satisfactoriamente.",
    "Error desconocido, intente nuavamente."
  );
  dispatch({
    type: ACTION_TYPES.MILKCONTROL.UPDATE_CURRENT,
    payload: response,
  });
  dispatch(list());
};

const deleteMilkControl = (data) => async (dispatch) => {
  const response = await IdeasCloudApi.fetch(
    "milkControlDelete",
    {
      ...data,
    },
    dispatch,
    "Control lecheros eliminado exitosamente.",
    "Error desconocido, intente nuavamente."
  );
  dispatch({ type: ACTION_TYPES.MILKCONTROL.DELETE, payload: response });
  dispatch(list());
};

const MilkActions = {
  list,
  get,
  create,
  update,
  deleteMilkControl,
};

export default MilkActions;

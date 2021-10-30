import ACTION_TYPES from "../types";
import IdeasCloudApi from "../../helpers/ideascloudApi";
import AnimalActions from "./animal.actions";

const list = () => async (dispatch, getState) => {
  const agribusiness = getState().agribusiness.current;
  const response = await IdeasCloudApi.fetch(
    "dryingControlListByAgribusiness",
    {
      agribusinessId: agribusiness?._id,
    }
  );

  dispatch({ type: ACTION_TYPES.DRYING.RETRIEVE, payload: response });
};

const get = (data) => async (dispatch) => {
  const response = await IdeasCloudApi.fetch("dryingControlGetById", data);
  dispatch({
    type: ACTION_TYPES.DRYING.UPDATE_CURRENT,
    payload: response,
  });
};

const create = (data, animal) => async (dispatch, getState) => {
  const agribusiness = getState().agribusiness.current;
  const response = await IdeasCloudApi.fetch(
    "dryingControlCreate",
    {
      ...data,
      agribusinessId: agribusiness._id,
    },
    dispatch,
    "Colectiva secado/destete registrado satisfactoriamente.",
    "Error desconocido, intente nuavamente."
  );
  dispatch(AnimalActions.list());
  dispatch({
    type: ACTION_TYPES.DRYING.CREATE,
    payload: { ...response, animal: animal },
  });
};
const update = (data) => async (dispatch) => {
  const response = await IdeasCloudApi.fetch(
    "dryingControlUpdate",
    data,
    dispatch,
    "Colectiva secado/destete actualizado satisfactoriamente.",
    "Error desconocido, intente nuavamente."
  );
  dispatch({
    type: ACTION_TYPES.DRYING.UPDATE_CURRENT,
    payload: response,
  });
  dispatch(list());
};

const deleteDrying = (data) => async (dispatch) => {
  const response = await IdeasCloudApi.fetch(
    "dryingControlDelete",
    {
      ...data,
    },
    dispatch,
    "Colectiva secado/destete eliminado exitosamente.",
    "Error desconocido, intente nuavamente."
  );
  dispatch({ type: ACTION_TYPES.DRYING.DELETE, payload: response });
  dispatch(list());
};

const DryingActions = {
  list,
  get,
  create,
  update,
  deleteDrying,
};

export default DryingActions;

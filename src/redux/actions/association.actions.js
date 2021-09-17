import ACTION_TYPES from "../types";
import IdeasCloudApi from "../../helpers/ideascloudApi";

const list = () => async (dispatch, getState) => {
  const agribusiness = getState().agribusiness.current;
  const response = await IdeasCloudApi.fetch(
    "associationControlListByAgribusiness",
    {
      agribusinessId: agribusiness?._id,
    }
  );

  dispatch({ type: ACTION_TYPES.ASSOCIATION.RETRIEVE, payload: response });
};

const get = (data) => async (dispatch) => {
  const response = await IdeasCloudApi.fetch("associationControlGetById", data);
  dispatch({
    type: ACTION_TYPES.ASSOCIATION.UPDATE_CURRENT,
    payload: response,
  });
};

const create = (data, animal) => async (dispatch, getState) => {
  const agribusiness = getState().agribusiness.current;
  const response = await IdeasCloudApi.fetch(
    "associationControlCreate",
    {
      ...data,
      agribusinessId: agribusiness._id,
    },
    dispatch,
    "Colectiva asociación registrado satisfactoriamente.",
    "Error desconocido, intente nuavamente."
  );
  dispatch({
    type: ACTION_TYPES.ASSOCIATION.CREATE,
    payload: { ...response, animal: animal },
  });
};
const update = (data) => async (dispatch) => {
  const response = await IdeasCloudApi.fetch(
    "associationControlUpdate",
    data,
    dispatch,
    "Colectiva asociación actualizado satisfactoriamente.",
    "Error desconocido, intente nuavamente."
  );
  dispatch({
    type: ACTION_TYPES.ASSOCIATION.UPDATE_CURRENT,
    payload: response,
  });
  dispatch(list());
};

const deleteAssociation = (data) => async (dispatch) => {
  const response = await IdeasCloudApi.fetch(
    "associationControlDelete",
    {
      ...data,
    },
    dispatch,
    "Colectiva asociación eliminado exitosamente.",
    "Error desconocido, intente nuavamente."
  );
  dispatch({ type: ACTION_TYPES.ASSOCIATION.DELETE, payload: response });
  dispatch(list());
};

const AssociationActions = {
  list,
  get,
  create,
  update,
  deleteAssociation,
};

export default AssociationActions;

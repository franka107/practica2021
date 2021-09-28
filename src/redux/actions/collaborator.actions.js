import ACTION_TYPES from "../types";
import IdeasCloudApi from "../../helpers/ideascloudApi";

const list = () => async (dispatch, getState) => {
  const agribusiness = getState().agribusiness.current;
  const response = await IdeasCloudApi.fetch("collaboratorListByAgribusiness", {
    agribusinessId: agribusiness?._id,
  });

  dispatch({ type: ACTION_TYPES.COLLABORATOR.RETRIEVE, payload: response });
};

const get = (data) => async (dispatch) => {
  const response = await IdeasCloudApi.fetch("collaboratorGetById", data);
  dispatch({
    type: ACTION_TYPES.COLLABORATOR.UPDATE_CURRENT,
    payload: response,
  });
};

const create = (data) => async (dispatch, getState) => {
  const agribusiness = getState().agribusiness.current;
  const response = await IdeasCloudApi.fetch(
    "collaboratorCreate",
    {
      ...data,
      agribusinessId: agribusiness._id,
    },
    dispatch,
    "Colaborador registrado satisfactoriamente.",
    "Error desconocido, intente nuavamente."
  );
  dispatch({
    type: ACTION_TYPES.COLLABORATOR.CREATE,
    payload: response,
  });
};
const update = (data) => async (dispatch) => {
  const response = await IdeasCloudApi.fetch(
    "collaboratorUpdate",
    data,
    dispatch,
    "Colaborador actualizado satisfactoriamente.",
    "Error desconocido, intente nuavamente."
  );
  dispatch({
    type: ACTION_TYPES.COLLABORATOR.UPDATE_CURRENT,
    payload: response,
  });
  dispatch(list());
};

const deleteCollaborator = (data) => async (dispatch) => {
  const response = await IdeasCloudApi.fetch(
    "collaboratorDelete",
    {
      ...data,
    },
    dispatch,
    "Colaborador eliminado exitosamente.",
    "Error desconocido, intente nuavamente."
  );
  dispatch({ type: ACTION_TYPES.COLLABORATOR.DELETE, payload: response });
  dispatch(list());
};

const CollaboratorActions = {
  list,
  get,
  create,
  update,
  deleteCollaborator,
};

export default CollaboratorActions;

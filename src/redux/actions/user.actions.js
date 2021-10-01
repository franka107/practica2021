import IdeasCloudApi from "../../helpers/ideascloudApi";
import ACTION_TYPES from "../types";

const list = () => async (dispatch, getState) => {
  const farm = getState().farm.current;
  const response = await IdeasCloudApi.fetch("userListByFarm", {
    farmId: farm?._id,
  });

  dispatch({ type: ACTION_TYPES.USER.RETRIEVE, payload: response });
};

const create = (data) => async (dispatch, getState) => {
  const farm = getState().farm.current;

  const response = await IdeasCloudApi.fetch(
    "userCreate",
    {
      ...data,
      farmId: farm._id,
    },
    dispatch,
    "Usuario registrado satisfactoriamente.",
    "Error desconocido, intente nuavamente."
  );
  dispatch({
    type: ACTION_TYPES.USER.CREATE,
    payload: response,
  });
};
const update = (data) => async (dispatch) => {
  await IdeasCloudApi.fetch(
    "userUpdate",
    data,
    dispatch,
    "Usuario actualizado satisfactoriamente.",
    "Error desconocido, intente nuavamente."
  );
  dispatch({ type: ACTION_TYPES.USER.UPDATE_CURRENT, payload: data });

  dispatch(list());
};

const get = (data) => async (dispatch) => {
  const response = await IdeasCloudApi.fetch("userGetById", data);
  dispatch({ type: ACTION_TYPES.USER.UPDATE_CURRENT, payload: response });
};

const deleteUser = (data) => async (dispatch) => {
  const response = await IdeasCloudApi.fetch("userDelete", data, dispatch);
  dispatch({ type: ACTION_TYPES.USER.DELETE, payload: response });

  dispatch(list());
};

const UserActions = {
  create,
  list,
  update,
  get,
  deleteUser,
};

export default UserActions;

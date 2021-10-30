import IdeasCloudApi from "../../helpers/ideascloudApi";
import ACTION_TYPES from "../types";
import geneticStockActions from "./geneticStock.actions";

const list = () => async (dispatch, getState) => {
  const agribusiness = getState().agribusiness.current;
  const response = await IdeasCloudApi.fetch("movementListByAgribusiness", {
    agribusinessId: agribusiness?._id,
  });

  dispatch({ type: ACTION_TYPES.MOVEMENT.RETRIEVE_LIST, payload: response });
};

const create = (data, geneticType) => async (dispatch, getState) => {
  const agribusiness = getState().agribusiness.current;
  const geneticStock = getState().geneticStock.list.find(
    (e) => e._id === data.geneticStockId
  );
  const response = await IdeasCloudApi.fetch(
    "movementCreate",
    {
      ...data,
      agribusinessId: agribusiness._id,
    },
    dispatch,
    "Movimiento registrado satisfactoriamente.",
    "Error desconocido, intente nuavamente."
  );
  dispatch({
    type: ACTION_TYPES.MOVEMENT.CREATE,
    payload: {
      ...response,
      total: response.quantity * response.unitValue,
      geneticStock,
    },
  });
  dispatch(
    geneticStockActions.listGeneticStockByAgribusiness({
      geneticType,
    })
  );
};
const update = (data, geneticType) => async (dispatch, getState) => {
  const response = await IdeasCloudApi.fetch(
    "movementUpdate",
    {
      ...data,
    },
    dispatch,
    "Movimiento actualizado satisfactoriamente.",
    "Error desconocido, intente nuavamente."
  );
  dispatch({ type: ACTION_TYPES.MOVEMENT.UPDATE_CURRENT, payload: response });
  dispatch(
    geneticStockActions.listGeneticStockByAgribusiness({
      geneticType,
    })
  );
  dispatch(list(geneticType));
};

const get = (data) => async (dispatch) => {
  const response = await IdeasCloudApi.fetch("movementGetById", data);
  dispatch({ type: ACTION_TYPES.MOVEMENT.UPDATE_CURRENT, payload: response });
};

const MovementActions = {
  create,
  list,
  update,
  get,
};

export default MovementActions;

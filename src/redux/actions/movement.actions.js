import IdeasCloudApi from "../../helpers/ideascloudApi";
import ACTION_TYPES from "../types";
import geneticStockActions from "./geneticStock.actions";
import uiActions from "./ui.actions";

const list = (geneticType) => async (dispatch, getState) => {
  const agribusiness = getState().agribusiness.current;
  const response = await IdeasCloudApi.fetch("movementListByAgribusiness", {
    agribusinessId: agribusiness._id,
    geneticType,
  });

  dispatch({ type: ACTION_TYPES.MOVEMENT.RETRIEVE_LIST, payload: response });
};

const MovementActions = {
  create: (data, geneticType) => async (dispatch, getState) => {
    const agribusiness = getState().agribusiness.current;
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
    dispatch({ type: ACTION_TYPES.MOVEMENT.CREATE, payload: response });
    dispatch(
      geneticStockActions.listGeneticStockByAgribusiness({
        geneticType,
      })
    );
  },

  update: (data, geneticType) => async (dispatch, getState) => {
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
  },

  list,
  get: (data) => async (dispatch) => {
    const response = await IdeasCloudApi.fetch("movementGetById", data);
    dispatch({ type: ACTION_TYPES.MOVEMENT.UPDATE_CURRENT, payload: response });
  },
};

export default MovementActions;

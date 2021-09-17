import ACTION_TYPES from "../types";
import IdeasCloudApi from "../../helpers/ideascloudApi";

const list = () => async (dispatch, getState) => {
  const agribusiness = getState().agribusiness.current;
  const response = await IdeasCloudApi.fetch("saleControlListByAgribusiness", {
    agribusinessId: agribusiness?._id,
  });

  dispatch({ type: ACTION_TYPES.SALE.RETRIEVE, payload: response });
};

const get = (data) => async (dispatch) => {
  const response = await IdeasCloudApi.fetch("saleControlGetById", data);
  dispatch({
    type: ACTION_TYPES.SALE.UPDATE_CURRENT,
    payload: response,
  });
};

const create = (data, animal) => async (dispatch, getState) => {
  const agribusiness = getState().agribusiness.current;
  const response = await IdeasCloudApi.fetch(
    "saleControlCreate",
    {
      ...data,
      agribusinessId: agribusiness._id,
    },
    dispatch,
    "Colectiva venta registrado satisfactoriamente.",
    "Error desconocido, intente nuavamente."
  );
  dispatch({
    type: ACTION_TYPES.SALE.CREATE,
    payload: { ...response, animal: animal },
  });
};
const update = (data) => async (dispatch) => {
  const response = await IdeasCloudApi.fetch(
    "saleControlUpdate",
    data,
    dispatch,
    "Colectiva venta actualizado satisfactoriamente.",
    "Error desconocido, intente nuavamente."
  );
  dispatch({
    type: ACTION_TYPES.SALE.UPDATE_CURRENT,
    payload: response,
  });
  dispatch(list());
};

const deleteSale = (data) => async (dispatch) => {
  const response = await IdeasCloudApi.fetch(
    "saleControlDelete",
    {
      ...data,
    },
    dispatch,
    "Colectiva venta eliminado exitosamente.",
    "Error desconocido, intente nuavamente."
  );
  dispatch({ type: ACTION_TYPES.SALE.DELETE, payload: response });
  dispatch(list());
};

const SaleActions = {
  list,
  get,
  create,
  update,
  deleteSale,
};

export default SaleActions;

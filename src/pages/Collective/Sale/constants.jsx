import { ROUTES_DICT } from "../../../routes/routesDict";

export const saleRouteOptions = (location) => [
  {
    key: "Agregar traslado y/o venta",
    path: {
      pathname: ROUTES_DICT.sale.create,
      state: {
        background: location,
      },
    },
    icon: "add",
  },
];

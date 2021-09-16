import { ROUTES_DICT } from "../../../routes/routesDict";

export const saleRouteOptions = (location) => [
  {
    key: "Agregar traslado y/o venta",
    path: {
      pathname: ROUTES_DICT.collective.zeal.create,
      state: {
        background: location,
      },
    },
  },
];

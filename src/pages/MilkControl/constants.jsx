import { ROUTES_DICT } from "../../routes/routesDict";

export const saleRouteOptions = (location) => [
  {
    key: "Inicio",
    path: ROUTES_DICT.milk.list,
  },
  {
    key: "Agregar control lechero",
    path: {
      pathname: ROUTES_DICT.milk.create,
      state: {
        background: location,
      },
    },
  },
];

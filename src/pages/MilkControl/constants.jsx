import { ROUTES_DICT } from "../../routes/routesDict";

export const milkRouteOptions = (location) => [
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

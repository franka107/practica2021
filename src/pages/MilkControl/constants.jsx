import { ROUTES_DICT } from "../../routes/routesDict";

export const milkRouteOptions = (location) => [
  {
    key: "Inicio",
    path: ROUTES_DICT.milk.list,
  },
  {
    key: "Agregar registro de ordeño",
    path: {
      pathname: ROUTES_DICT.milk.create,
      state: {
        background: location,
      },
    },
  },
];

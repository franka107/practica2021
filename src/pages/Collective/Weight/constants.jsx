import { ROUTES_DICT } from "../../../routes/routesDict";

export const weightRouteOptions = (location) => [
  {
    key: "Agregar ingreso de peso",
    path: {
      pathname: ROUTES_DICT.weight.create,
      state: {
        background: location,
      },
    },
  },
];

import { ROUTES_DICT } from "../../../routes/routesDict";

export const weightRouteOptions = (location) => [
  {
    key: "Agregar ingreso de peso",
    path: {
      pathname: ROUTES_DICT.collective.weight.create,
      state: {
        background: location,
      },
    },
  },
];

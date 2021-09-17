import { ROUTES_DICT } from "../../routes/routesDict";

export const palpationRouteOptions = (location) => [
  {
    key: "Inicio",
    path: ROUTES_DICT.palpation.list,
  },
  {
    key: "Agregar palpación",
    path: {
      pathname: ROUTES_DICT.palpation.create,
      state: {
        background: location,
      },
    },
  },
];

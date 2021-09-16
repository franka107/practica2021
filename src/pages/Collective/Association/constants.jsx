import { ROUTES_DICT } from "../../../routes/routesDict";

export const associationRouteOptions = (location) => [
  {
    key: "Agregar ingreso de registro de asociación",
    path: {
      pathname: ROUTES_DICT.collective.association.create,
      state: {
        background: location,
      },
    },
  },
];

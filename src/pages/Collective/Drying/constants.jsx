import { ROUTES_DICT } from "../../../routes/routesDict";

export const dryingRouteOptions = (location) => [
  {
    key: "Agregar secado",
    path: {
      pathname: ROUTES_DICT.collective.drying.create,
      state: {
        background: location,
      },
    },
  },
];

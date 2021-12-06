import { ROUTES_DICT } from "../../../routes/routesDict";

export const dryingRouteOptions = (location) => [
  {
    key: "Agregar secado/destete",
    path: {
      pathname: ROUTES_DICT.collective.drying.create,
      state: {
        background: location,
      },
    },
    icon: "add",
  },
];

import { ROUTES_DICT } from "../../../routes/routesDict";

export const zealRouteOptions = (location) => [
  {
    key: "Agregar registro celo",
    path: {
      pathname: ROUTES_DICT.collective.zeal.create,
      state: {
        background: location,
      },
    },
    icon: "add",
  },
];

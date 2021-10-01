import { ROUTES_DICT } from "../../routes/routesDict";

export const userRouteOptions = (location) => [
  {
    key: "Agregar nuevo usuario",
    path: {
      pathname: ROUTES_DICT.users.create,
      state: {
        background: location,
      },
    },
  },
];

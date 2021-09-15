import { ROUTES_DICT } from "../../routes/routesDict";

export const animalRouteOptions = (location) => [
  {
    key: "Inicio",
    path: ROUTES_DICT.animal.list,
  },
  {
    key: "Estadísticas",
    path: {
      pathname: ROUTES_DICT.geneticStock.geneticType.create,
      state: {
        background: location,
      },
    },
  },
];

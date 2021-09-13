import { ROUTES_DICT, ROUTES_SLUGS } from "../../routes/routesDict";

export const embryoRouteOptions = (location) => [
  {
    key: "Inventario",
    path: ROUTES_DICT.geneticStock.geneticType.list.replace(
      ":geneticType",
      ROUTES_SLUGS.embryo
    ),
  },
  {
    key: "Nuevo stock de embriónes",
    path: {
      pathname: ROUTES_DICT.geneticStock.geneticType.create.replace(
        ":geneticType",
        ROUTES_SLUGS.embryo
      ),
      state: {
        background: location,
      },
    },
  },
  {
    key: "Movimientos",
    path: ROUTES_DICT.movements.replace(":geneticType", ROUTES_SLUGS.embryo),
  },
  {
    key: "Nuevo movimiento",
    path: {
      pathname: ROUTES_DICT.movementsCreate.replace(
        ":geneticType",
        ROUTES_SLUGS.embryo
      ),
      state: {
        background: location,
      },
    },
  },
];

export const semenRouteOptions = (location) => [
  {
    key: "Inventario",
    path: ROUTES_DICT.geneticStock.geneticType.list.replace(
      ":geneticType",
      ROUTES_SLUGS.semen
    ),
  },
  {
    key: "Nuevo stock de semen",
    path: {
      pathname: ROUTES_DICT.geneticStock.geneticType.create.replace(
        ":geneticType",
        ROUTES_SLUGS.semen
      ),
      state: {
        background: location,
      },
    },
  },
  {
    key: "Movimientos",
    path: ROUTES_DICT.movements.replace(":geneticType", ROUTES_SLUGS.semen),
  },
  {
    key: "Nuevo movimiento",
    path: {
      pathname: ROUTES_DICT.movementsCreate.replace(
        ":geneticType",
        ROUTES_SLUGS.semen
      ),
      state: {
        background: location,
      },
    },
  },
];

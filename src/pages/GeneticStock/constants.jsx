import { ROUTES_DICT, ROUTES_SLUGS } from "../../routes/routesDict";

export const embryoRouteOptions = [
  {
    key: "Inventario",
    path: ROUTES_DICT.embryo,
  },
  {
    key: "Nuevo embrión",
    path: ROUTES_DICT.embryoCreate,
  },
  {
    key: "Movimientos",
    path: ROUTES_DICT.movements.replace(":geneticType", ROUTES_SLUGS.embryo),
  },
  {
    key: "Nuevo movimiento",
    path: ROUTES_DICT.movementsCreate.replace(
      ":geneticType",
      ROUTES_SLUGS.embryo
    ),
  },
];

export const semenRouteOptions = [
  {
    key: "Inventario",
    path: ROUTES_DICT.semen,
  },
  {
    key: "Nuevo semen",
    path: ROUTES_DICT.semenCreate,
  },
  {
    key: "Movimientos",
    path: ROUTES_DICT.movements.replace(":geneticType", ROUTES_SLUGS.semen),
  },
  {
    key: "Nuevo movimiento",
    path: ROUTES_DICT.movementsCreate.replace(
      ":geneticType",
      ROUTES_SLUGS.semen
    ),
  },
];

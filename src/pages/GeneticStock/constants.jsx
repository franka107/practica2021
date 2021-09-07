import { ROUTES_DICT, ROUTES_SLUGS } from "../../routes/routesDict";

export const embryoRouteOptions = (location, setOpen, setDialog) => [
  {
    key: "Inventario",
    path: ROUTES_DICT.embryo,
  },
  {
    key: "Nuevo embrión",

    //path: ROUTES_DICT.embryoCreate,
    onClick: () => {
      setOpen(true);
      setDialog("Embryo");
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
        from: location.pathname,
      },
    },
  },
];

export const semenRouteOptions = (location) => [
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
    path: {
      pathname: ROUTES_DICT.movementsCreate.replace(
        ":geneticType",
        ROUTES_SLUGS.semen
      ),
      state: {
        from: location.pathname,
      },
    },
  },
];

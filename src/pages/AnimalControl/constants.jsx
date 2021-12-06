import { ROUTES_DICT } from "../../routes/routesDict";

export const animalRouteOptions = (location) => [
  {
    key: "Inicio",
    path: ROUTES_DICT.animal.list,
    icon: "home",
  },
  {
    key: "Agregar Animal",
    path: ROUTES_DICT.animal.create,
    icon: "add",
  },
  {
    key: "Carga Masiva",
    path: ROUTES_DICT.animal.createBulk,
    icon: "bulk",
  },
];

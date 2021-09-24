import { ROUTES_DICT } from "../../routes/routesDict";

export const animalDetailChipOptions = (location) => [
  {
    key: "Inicio",
    path: {
      pathname: ROUTES_DICT.animal.list,
      background: location,
    },
  },
  {
    key: "Información general",
    path: {
      pathname: ROUTES_DICT.animalDetail.root,
      background: location,
    },
  },
  {
    key: "Pedigree",
    path: {
      pathname: ROUTES_DICT.birth.list,
      background: location,
    },
  },
  {
    key: "Eliminar animal",
    path: {
      pathname: ROUTES_DICT.birth.create,
      background: location,
    },
  },
];

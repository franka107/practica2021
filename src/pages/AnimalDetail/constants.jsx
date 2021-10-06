import { generatePath } from "react-router";
import { ROUTES_DICT } from "../../routes/routesDict";

export const animalDetailChipOptions = (location, params) => [
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
      pathname: generatePath(ROUTES_DICT.animalDetail.root, {
        ...params,
        _id: params._id,
      }),
      background: location,
    },
  },
  {
    key: "Pedigree",
    path: {
      pathname: generatePath(ROUTES_DICT.animalDetail.pedigree, {
        ...params,
        _id: params._id,
      }),
      background: location,
    },
  },
  {
    key: "Eliminar animal",
    path: generatePath(ROUTES_DICT.animalDetail.delete, {
      ...params,
      _id: params._id,
    }),
  },
];

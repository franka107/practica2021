export const columns = [
  {
    id: 1,
    title: "Identificación del animal",
    key: "identifier",
    color: true,
  },
  {
    id: 2,
    title: "Nombre",
    key: "name",
    color: true,
  },
  {
    id: 3,
    title: "Fecha de nacimiento",
    color: true,
    key: "birthDate",
  },
  {
    id: 4,
    title: "Sexo",
    color: true,
    key: "gender",
  },
  {
    id: 5,
    title: "Estado",
    color: false,
    key: "reproductiveStatus",
  },
  {
    id: 6,
    title: "Estadísticas",
    key: "isReproductive",
  },
  {
    id: 7,
    title: "Fecha registro",
    color: true,
    key: "herdDate",
  },
];

export const cowsDataExample = [
  {
    id: "1",
    identifier: "ARE01",
    birthDate: "2021-07-08",
    name: "Lola",
    gender: "FE",
    isReproductive: false,
    reproductiveStatus: "VAC",
    herdDate: "2021-07-15",
    __typename: "AnimalType",
    outstanding: false,
  },
  {
    id: "2",
    identifier: "ARE02",
    birthDate: "2021-07-08",
    name: "Lola",
    gender: "FE",
    isReproductive: false,
    reproductiveStatus: "VAC",
    herdDate: "2021-07-15",
    __typename: "AnimalType",
    outstanding: true,
  },
];

export const columnsToCustomMaterialTable = [
  {
    id: 1,
    title: "Identificación del animal",
    field: "identifier",
    color: true,
  },
  {
    id: 2,
    title: "Nombre",
    field: "name",
    color: true,
  },
  {
    id: 3,
    title: "Edad",
    color: true,
    field: "birthDate",
  },
  {
    id: 4,
    title: "Sexo",
    color: true,
    field: "gender",
  },
  {
    id: 5,
    title: "Estado",
    color: false,
    field: "reproductiveStatus",
  },
  {
    id: 6,
    title: "Estadísticas",
    field: "isReproductive",
  },
  {
    id: 7,
    title: "Fecha registro",
    color: true,
    field: "herdDate",
  },
];

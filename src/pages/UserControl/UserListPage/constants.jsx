export const usersExampleData = [
  { fullName: "George Puma", perfil: "Some", actions: "" },
  { fullName: "Miguel Puma", perfil: "Some", actions: "" },
  { fullName: "Alejando Puma", perfil: "Some", actions: "" },
  { fullName: "Eddy Puma", perfil: "Some", actions: "" },
  { fullName: "Carol Puma", perfil: "Some", actions: "" },
  { fullName: "Juan lPuma", perfil: "Some", actions: "" },
];

export const userColumns = [
  {
    label: "Nombres",
    name: "firstName",
    options: {
      filter: false,
    },
  },
  {
    label: "Apellidos",
    name: "lastName",
    options: {
      filter: false,
    },
  },
  {
    label: "Perfil",
    name: "perfil",
    options: {
      customBodyRender: (value) => "Básico",
      filter: false,
    },
  },
];

// export const perfilOptions = [
//   { id: "MA", name: "Perfil básico" },
//   { id: "FE", name: "Perfil avanzado" },
// ];

import { faUsers, faUser, faSignal } from "@fortawesome/free-solid-svg-icons";
import { ROUTES_DICT } from "../../routes/routesDict";

export const menuList = [
  {
    id: "usuarios",
    title: "Usuarios",
    img: faUsers,
    submenu: [
      {
        id: "inicio",
        title: "Inicio",
        link: ROUTES_DICT.users,
      },
      {
        id: "agregar-nuevo-usuario",
        title: "Agregar nuevo usuario",
        // link: routesDictionary.userManagement,
      },
    ],
  },
  {
    id: "perfiles",
    title: "Perfiles",
    img: faSignal,
    submenu: [
      {
        id: "inicio",
        title: "Inicio",
        link: ROUTES_DICT.profile,
      },
      {
        id: "agregar-nuevo-perfil",
        title: "Agregar nuevo perfil",
        // link: routesDictionary.profileManagement,
      },
    ],
  },
  {
    id: "account",
    title: "Cuenta",
    img: faUser,
    link: ROUTES_DICT.account,
  },
];

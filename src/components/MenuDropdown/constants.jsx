import { faCog, faHome, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { ROUTES_DICT } from "../../routes/routesDict";

export const menuItems = [
  {
    id: 1,
    title: "Inicio",
    img: faHome,
    link: ROUTES_DICT.test1,
  },
  {
    id: 2,
    title: "Configuración",
    img: faCog,
    link: ROUTES_DICT.test,
  },
  {
    id: 3,
    title: "Cerrar Sesión",
    img: faSignOutAlt,
    link: ROUTES_DICT.test,
  },
  {
    id: 4,
    title: "Planes",
  },
  {
    id: 5,
    title: "Contáctanos",
  },
  {
    id: 6,
    title: "Productos",
  },
  {
    id: 7,
    title: "Industrias",
  },
  {
    id: 8,
    title: "Equipos",
  },
];

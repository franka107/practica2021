import { ReactComponent as Rec1 } from "../../assets/icons/menuRecurso_5.svg";
import { ReactComponent as Rec2 } from "../../assets/icons/menuRecurso_6.svg";
import { ReactComponent as Rec3 } from "../../assets/icons/menuRecurso_7.svg";
import { ReactComponent as Rec5 } from "../../assets/icons/menuRecurso_9.svg";
import { ReactComponent as Rec10 } from "../../assets/icons/menuRecurso_10.svg";
import { ReactComponent as Rec11 } from "../../assets/icons/menuRecurso_11.svg";
import {
  faHome,
  faCalendarAlt,
  faSignal,
  faKey,
  faArchive,
  faListAlt,
  // faShoppingCart,
  faSyringe,
} from "@fortawesome/free-solid-svg-icons";
import { ROUTES_DICT, ROUTES_SLUGS } from "../../routes/routesDict";

export const menuList = () => {
  const validator = localStorage.getItem("reproductiveManagement");
  if (validator !== "DM_&_AI_&_ET") {
    list[2].submenu[5].submenu.splice(2, 1);
    return list;
  } else {
    const newObject = {
      id: "agregar-transferencias",
      title: "Agregar transf. embriones",
      link: ROUTES_DICT.service.createET,
    };
    list[2].submenu[5].submenu.splice(2, 1, newObject);
    return list;
  }
};

export const list = [
  {
    id: "control-ganadero",
    title: "Control ganadero",
    img: faHome,
    submenu: [
      {
        id: "inicio",
        title: "Inicio",
        link: ROUTES_DICT.animal.list,
      },
      // {
      //   id: "estadisticas",
      //   title: "Estadísticas",
      //   // link: routesDictionary.livestockControl,
      // },
    ],
  },
  {
    id: "control-lechero",
    title: "Control lechero",
    img: Rec1,
    submenu: [
      {
        id: "inicio",
        title: "Inicio",
        link: ROUTES_DICT.milk.list,
      },
      {
        id: "agregar",
        title: "Agregar registro de ordeño",
        link: ROUTES_DICT.milk.create,
      },
    ],
  },
  {
    id: "control-reproductivo",
    title: "Control reproductivo",
    img: faSyringe,
    submenu: [
      {
        id: "preñeces",
        title: "Preñeces",
        img: Rec2,
        link: ROUTES_DICT.pregnancies,
      },
      {
        id: "palpaciones",
        title: "Palpaciones",
        img: Rec3,
        submenu: [
          {
            id: "inicio",
            title: "Inicio",
            link: ROUTES_DICT.palpation.list,
          },
          {
            id: "agregar",
            title: "Agregar palpación",
            link: ROUTES_DICT.palpation.create,
          },
        ],
      },
      {
        id: "5",
        title: "Nacimientos",
        img: faCalendarAlt,
        // link: routesDictionary.birth,
        submenu: [
          {
            id: "inicio",
            title: "Inicio",
            link: ROUTES_DICT.birth.list,
          },
          {
            id: "agregar",
            title: "Agregar nacimiento",
            link: ROUTES_DICT.birth.create,
          },
        ],
      },
      {
        id: "prod-embriones",
        title: "Prod. Embriones",
        img: Rec5,
        // link: routesDictionary.livestockControl,
      },
      {
        id: "andrología",
        title: "Andrología",
        img: Rec10,
        // link: routesDictionary.livestockControl,
      },
      {
        id: "servicios",
        title: "Servicios",
        img: Rec11,
        submenu: [
          {
            id: "inicio",
            title: "Inicio",
            link: ROUTES_DICT.service.list,
          },
          {
            id: "agregar",
            title: "Agregar I.A / M.N.",
            link: ROUTES_DICT.service.createIAMN,
          },
          {
            id: "agregar-transferencias",
            title: "Agregar transf. embriones",
            link: ROUTES_DICT.service.createET,
          },
        ],
      },
      {
        id: "colectiva",
        title: "Colectiva",
        img: faSignal,
        submenu: [
          {
            id: "registro-celos",
            title: "Registro celos",
            link: ROUTES_DICT.collective.zeal.list,
          },
          // {
          //   id: "agregar-pesos",
          //   title: "Ingresos Pesos",
          //   link: ROUTES_DICT.collective.weight.list,
          // },
          {
            id: "ventas",
            title: "Ventas",
            link: ROUTES_DICT.collective.sale.list,
          },
          // {
          //   id: "sanidad",
          //   title: "Sanidad",
          //   link: routesDictionary.livestockControl,
          // },
          // {
          //   id: "agregar-registros",
          //   title: "Reg. asociación",
          //   link: ROUTES_DICT.collective.association.list,
          // },
          {
            id: "secados",
            title: "Secados/Destete",
            link: ROUTES_DICT.collective.drying.list,
          },
        ],
      },
      {
        id: "existencias",
        title: "Existencias genéticas",
        img: faKey,
        submenu: [
          {
            id: "semen",
            title: "Semen",
            link: ROUTES_DICT.geneticStock.geneticType.list.replace(
              ":geneticType",
              ROUTES_SLUGS.semen
            ),
          },
          {
            id: "embriones",
            title: "Embriones",
            link: ROUTES_DICT.geneticStock.geneticType.list.replace(
              ":geneticType",
              ROUTES_SLUGS.embryo
            ),
          },
        ],
      },
      {
        id: "reportes",
        title: "Reportes",
        img: faArchive,
        // link: routesDictionary.livestockControl,
      },
      {
        id: "carga-masiva",
        title: "Carga masiva",
        img: faListAlt,
        submenu: [
          {
            id: "animales",
            title: "Masiva de animales",
            // link: routesDictionary.livestockControl,
          },
          {
            id: "embriones",
            title: "Masiva de embroines",
            // link: routesDictionary.livestockControl,
          },
          {
            id: "inseminaciones",
            title: "Masiva de inseminaciones",
            // link: routesDictionary.livestockControl,
          },
        ],
      },
    ],
  },
];

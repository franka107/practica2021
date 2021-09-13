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

export const menuList = [
  {
    id: "control-ganadero",
    title: "Control ganadero",
    img: faHome,
    submenu: [
      {
        id: "inicio",
        title: "Inicio",
        link: ROUTES_DICT.animalControl,
      },
      {
        id: "estadisticas",
        title: "Estadísticas",
        // link: routesDictionary.livestockControl,
      },
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
        // link: routesDictionary.milkControl,
      },
      {
        id: "agregar",
        title: "Agregar control lechero",
        // link: routesDictionary.milkControl,
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
            link: ROUTES_DICT.palpations,
          },
          {
            id: "agregar",
            title: "Agregar palpación",
            // link: routesDictionary.palpation,
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
            link: ROUTES_DICT.birth,
          },
          {
            id: "agregar",
            title: "Agregar nacimiento",
            // link: routesDictionary.palpation,
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
            link: ROUTES_DICT.service,
          },
          {
            id: "agregar",
            title: "Agregar I.A / M.N.",
            link: ROUTES_DICT.iamnCreate,
          },
          {
            id: "agregar-transferencias",
            title: "Agregar transf. embriones",
            // link: routesDictionary.service,
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
            link: ROUTES_DICT.zeal,
          },
          {
            id: "agregar-pesos",
            title: "Ingresos Pesos",
            link: ROUTES_DICT.weight,
          },
          {
            id: "ventas",
            title: "Ventas",
            // link: routesDictionary.sale,
          },
          {
            id: "sanidad",
            title: "Sanidad",
            // link: routesDictionary.livestockControl,
          },
          {
            id: "agregar-registros",
            title: "Ingreso reg. asoc.",
            // link: routesDictionary.association,
          },
          {
            id: "secados",
            title: "Secados/Destete",
            // link: routesDictionary.drying,
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
  // ,
  // {
  //   id: "preñeces",
  //   title: "Preñeces",
  //   // img: Rec2,
  //   // link: routesDictionary.pregnancies,
  // },
  // {
  //   id: "palpaciones",
  //   title: "Palpaciones",
  //   // img: Rec3,
  //   submenu: [
  //     {
  //       id: "inicio",
  //       title: "Inicio",
  //       // link: routesDictionary.palpation,
  //     },
  //     {
  //       id: "agregar",
  //       title: "Agregar palpación",
  //       // link: routesDictionary.palpation,
  //     },
  //   ],
  // },
  // {
  //   id: "5",
  //   title: "Nacimientos",
  //   // img: faCalendarAlt,
  //   // link: routesDictionary.birth,
  //   submenu: [
  //     {
  //       id: "inicio",
  //       title: "Inicio",
  //       // link: routesDictionary.birth,
  //     },
  //     {
  //       id: "agregar",
  //       title: "Agregar nacimiento",
  //       // link: routesDictionary.palpation,
  //     },
  //   ],
  // },
  // {
  //   id: "prod-embriones",
  //   title: "Prod. Embriones",
  //   // img: Rec5,
  //   // link: routesDictionary.livestockControl,
  // },
  // {
  //   id: "andrología",
  //   title: "Andrología",
  //   // img: Rec10,
  //   // link: routesDictionary.livestockControl,
  // },
  // {
  //   id: "servicios",
  //   title: "Servicios",
  //   // img: Rec11,
  //   submenu: [
  //     {
  //       id: "inicio",
  //       title: "Inicio",
  //       // link: routesDictionary.service,
  //     },
  //     {
  //       id: "agregar",
  //       title: "Agregar I.A / M.N.",
  //       // link: routesDictionary.service,
  //     },
  //     {
  //       id: "agregar-transferencias",
  //       title: "Agregar transf. embriones",
  //       // link: routesDictionary.service,
  //     },
  //   ],
  // },
  // {
  //   id: "colectiva",
  //   title: "Colectiva",
  //   // img: faSignal,
  //   submenu: [
  //     {
  //       id: "registro-celos",
  //       title: "Registro celos",
  //       link: routesDictionary.test1,
  //     },
  //     {
  //       id: "agregar-pesos",
  //       title: "Ingresos Pesos",
  //       link: routesDictionary.test,
  //     },
  //     {
  //       id: "ventas",
  //       title: "Ventas",
  //       // link: routesDictionary.sale,
  //     },
  //     {
  //       id: "sanidad",
  //       title: "Sanidad",
  //       // link: routesDictionary.livestockControl,
  //     },
  //     {
  //       id: "agregar-registros",
  //       title: "Ingreso reg. asoc.",
  //       // link: routesDictionary.association,
  //     },
  //     {
  //       id: "secados",
  //       title: "Secados/Destete",
  //       // link: routesDictionary.drying,
  //     },
  //   ],
  // },
  // {
  //   id: "existencias",
  //   title: "Existencias genéticas",
  //   // img: faKey,
  //   submenu: [
  //     {
  //       id: "semen",
  //       title: "Semen",
  //       // link: routesDictionary.semen,
  //     },
  //     {
  //       id: "embriones",
  //       title: "Embriones",
  //       // link: routesDictionary.embryo,
  //     },
  //   ],
  // },
  // {
  //   id: "reportes",
  //   title: "Reportes",
  //   // img: faArchive,
  //   // link: routesDictionary.livestockControl,
  // },
  // {
  //   id: "carga-masiva",
  //   title: "Carga masiva",
  //   // img: faListAlt,
  //   submenu: [
  //     {
  //       id: "animales",
  //       title: "Masiva de animales",
  //       // link: routesDictionary.livestockControl,
  //     },
  //     {
  //       id: "embriones",
  //       title: "Masiva de embroines",
  //       // link: routesDictionary.livestockControl,
  //     },
  //     {
  //       id: "inseminaciones",
  //       title: "Masiva de inseminaciones",
  //       // link: routesDictionary.livestockControl,
  //     },
  //   ],
  // },
  // {
  //   id: 'planes',
  //   title: 'Planes',
  // img: faShoppingCart,
  // link: routesDictionary.livestockControl,
  // },
];

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
    title: "Control de Ganado",
    tour: "sidebar__control__animal",
    img: faHome,
    submenu: [
      {
        id: "Registro",
        title: "Agregar Animal",
        link: ROUTES_DICT.animal.create,
      },
      {
        id: "Modificacion",
        title: "Modificacion",
        link: ROUTES_DICT.animal.list,
      },
      {
        id: "Carga Masiva",
        title: "Carga Masiva",
        link: ROUTES_DICT.animal.createBulk,
      },
      {
        id: "Analisis",
        title: "Analisis",
        link: ROUTES_DICT.animal.createBulk,
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
    title: "Control de Produccion",
    tour: "sidebar__control__milk",
    img: Rec1,
    submenu: [
      {
        id: "inicio",
        title: "Produccion Lechera",
        submenu: [
          {
            id: "agregar",
            title: "Registro Diario",
            // link: ROUTES_DICT.palpation.create,
          },
          {
            id: "inicio",
            title: "Modificacion",
            // link: ROUTES_DICT.palpation.list,
          },
          {
            id: "inicio",
            title: "Analisis",
            // link: ROUTES_DICT.palpation.list,
          },
        ],
      },
      {
        id: "inicio",
        title: "Produccion Engorde",
        submenu: [
          {
            id: "agregar",
            title: "Registro Peso",
            // link: ROUTES_DICT.palpation.create,
          },
          {
            id: "inicio",
            title: "Modificacion",
            // link: ROUTES_DICT.palpation.list,
          },
          {
            id: "inicio",
            title: "Analisis",
            // link: ROUTES_DICT.palpation.list,
          },
        ],
      },
    ],
  },
  {
    id: "control-reproductivo",
    title: "Control de Reproducción",
    img: faSyringe,
    submenu: [
      {
        id: "inicio",
        title: "Colecticva",
        submenu: [
          {
            id: "agregar",
            title: "Nuevo registro",
            // link: ROUTES_DICT.palpation.create,
          },
          {
            id: "inicio",
            title: "Modificacion",
            // link: ROUTES_DICT.palpation.list,
          },
          {
            id: "inicio",
            title: "Analisis",
            // link: ROUTES_DICT.palpation.list,
          },
        ],
      },
      {
        id: "inicio",
        title: "Servicios Reproductivos",
        submenu: [
          {
            id: "agregar",
            title: "Nuevo registro",
            // link: ROUTES_DICT.palpation.create,
          },
          {
            id: "inicio",
            title: "Modificacion",
            // link: ROUTES_DICT.palpation.list,
          },
          {
            id: "inicio",
            title: "Analisis",
            // link: ROUTES_DICT.palpation.list,
          },
        ],
      },
      {
        id: "inicio",
        title: "Palpaciones",
        submenu: [
          {
            id: "agregar",
            title: "Nuevo registro",
            // link: ROUTES_DICT.palpation.create,
          },
          {
            id: "inicio",
            title: "Modificacion",
            // link: ROUTES_DICT.palpation.list,
          },
          {
            id: "inicio",
            title: "Analisis",
            // link: ROUTES_DICT.palpation.list,
          },
        ],
      },
      {
        id: "inicio",
        title: "Nacimientos",
        submenu: [
          {
            id: "agregar",
            title: "Nuevo registro",
            // link: ROUTES_DICT.palpation.create,
          },
          {
            id: "inicio",
            title: "Modificacion",
            // link: ROUTES_DICT.palpation.list,
          },
          {
            id: "inicio",
            title: "Analisis",
            // link: ROUTES_DICT.palpation.list,
          },
        ],
      },
      {
        id: "inicio",
        title: "Prod. Embriones(PRO)",
        submenu: [
          {
            id: "agregar",
            title: "Nuevo registro",
            // link: ROUTES_DICT.palpation.create,
          },
          {
            id: "inicio",
            title: "Modificacion",
            // link: ROUTES_DICT.palpation.list,
          },
          {
            id: "inicio",
            title: "Analisis",
            // link: ROUTES_DICT.palpation.list,
          },
        ],
      },
      {
        id: "inicio",
        title: "Existencias Geneticas",
        submenu: [
          {
            id: "agregar",
            title: "Nuevo registro",
            // link: ROUTES_DICT.palpation.create,
          },
          {
            id: "inicio",
            title: "Modificacion",
            // link: ROUTES_DICT.palpation.list,
          },
          {
            id: "inicio",
            title: "Analisis",
            // link: ROUTES_DICT.palpation.list,
          },
        ],
      },
      {
        id: "inicio",
        title: "Andrologia (PRO)",
        submenu: [
          {
            id: "agregar",
            title: "Nuevo registro",
            // link: ROUTES_DICT.palpation.create,
          },
          {
            id: "inicio",
            title: "Modificacion",
            // link: ROUTES_DICT.palpation.list,
          },
          {
            id: "inicio",
            title: "Analisis",
            // link: ROUTES_DICT.palpation.list,
          },
        ],
      },
      {
        id: "inicio",
        title: "Colecticva",
        submenu: [
          {
            id: "agregar",
            title: "Nuevo registro",
            // link: ROUTES_DICT.palpation.create,
          },
          {
            id: "inicio",
            title: "Modificacion",
            // link: ROUTES_DICT.palpation.list,
          },
          {
            id: "inicio",
            title: "Analisis",
            // link: ROUTES_DICT.palpation.list,
          },
        ],
      },
    ],

    // {
    //   id: "preñeces",
    //   title: "Preñeces",
    //   img: Rec2,
    //   link: ROUTES_DICT.pregnancies,
    // },
    // {
    //   id: "palpaciones",
    //   title: "Palpaciones",
    //   img: Rec3,
    //   submenu: [
    //     {
    //       id: "inicio",
    //       title: "Inicio",
    //       link: ROUTES_DICT.palpation.list,
    //     },
    //     {
    //       id: "agregar",
    //       title: "Agregar palpación",
    //       link: ROUTES_DICT.palpation.create,
    //     },
    //   ],
    // },
    // {
    //   id: "5",
    //   title: "Nacimientos",
    //   img: faCalendarAlt,
    //   // link: routesDictionary.birth,
    //   submenu: [
    //     {
    //       id: "inicio",
    //       title: "Inicio",
    //       link: ROUTES_DICT.birth.list,
    //     },
    //     {
    //       id: "agregar",
    //       title: "Agregar nacimiento",
    //       link: ROUTES_DICT.birth.create,
    //     },
    //   ],
    // },
    // {
    //   id: "prod-embriones",
    //   title: "Prod. Embriones",
    //   img: Rec5,
    //   // link: routesDictionary.livestockControl,
    // },
    // {
    //   id: "andrología",
    //   title: "Andrología",
    //   img: Rec10,
    //   // link: routesDictionary.livestockControl,
    // },
    // {
    //   id: "servicios",
    //   title: "Servicios",
    //   img: Rec11,
    //   submenu: [
    //     {
    //       id: "inicio",
    //       title: "Inicio",
    //       link: ROUTES_DICT.service.list,
    //     },
    //     {
    //       id: "agregar",
    //       title: "Agregar I.A / M.N.",
    //       link: ROUTES_DICT.service.createIAMN,
    //     },
    //     {
    //       id: "agregar-transferencias",
    //       title: "Agregar transf. embriones",
    //       link: ROUTES_DICT.service.createET,
    //     },
    //   ],
    // },
    // {
    //   id: "colectiva",
    //   title: "Colectiva",
    //   img: faSignal,
    //   submenu: [
    //     {
    //       id: "registro-celos",
    //       title: "Registro celos",
    //       link: ROUTES_DICT.collective.zeal.list,
    //     },
    //     // {
    //     //   id: "agregar-pesos",
    //     //   title: "Ingresos Pesos",
    //     //   link: ROUTES_DICT.collective.weight.list,
    //     // },
    //     {
    //       id: "ventas",
    //       title: "Ventas",
    //       link: ROUTES_DICT.collective.sale.list,
    //     },
    //     // {
    //     //   id: "sanidad",
    //     //   title: "Sanidad",
    //     //   link: routesDictionary.livestockControl,
    //     // },
    //     // {
    //     //   id: "agregar-registros",
    //     //   title: "Reg. asociación",
    //     //   link: ROUTES_DICT.collective.association.list,
    //     // },
    //     {
    //       id: "secados",
    //       title: "Secados/Destete",
    //       link: ROUTES_DICT.collective.drying.list,
    //     },
    //   ],
    // },
    // {
    //   id: "existencias",
    //   title: "Existencias genéticas",
    //   img: faKey,
    //   submenu: [
    //     {
    //       id: "semen",
    //       title: "Semen",
    //       link: ROUTES_DICT.geneticStock.geneticType.list.replace(
    //         ":geneticType",
    //         ROUTES_SLUGS.semen
    //       ),
    //     },
    //     {
    //       id: "embriones",
    //       title: "Embriones",
    //       link: ROUTES_DICT.geneticStock.geneticType.list.replace(
    //         ":geneticType",
    //         ROUTES_SLUGS.embryo
    //       ),
    //     },
    //   ],
    // },
    // {
    //   id: "reportes",
    //   title: "Reportes",
    //   img: faArchive,
    //   // link: routesDictionary.livestockControl,
    // },
    // {
    //   id: "carga-masiva",
    //   title: "Carga masiva",
    //   img: faListAlt,
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
    // ],
  },
  {
    id: "G",
    title: "Control de Ventas",
    img: Rec1,
    submenu: [
      {
        id: "inicio",
        title: "Nuevo Registro",
      },
      {
        id: "inicio",
        title: "Modificación",
      },
      {
        id: "inicio",
        title: "Analisis",
      },
    ],
  },
  {
    id: "A",
    title: "Control de Subministros",
    img: Rec1,
    submenu: [
      {
        id: "inicio",
        title: "Nuevo Registro",
      },
      {
        id: "inicio",
        title: "Modificación",
      },
      {
        id: "inicio",
        title: "Analisis",
      },
    ],
  },
  {
    id: "X",
    title: "Control de Sanidad Veterinaria",
    img: Rec1,
    submenu: [
      {
        id: "inicio",
        title: "Nuevo Registro",
      },
      {
        id: "inicio",
        title: "Modificación",
      },
      {
        id: "inicio",
        title: "Analisis",
      },
    ],
  },
  {
    id: "B",
    title: "Tablero de Control de Gestión (PRO)",
    img: Rec1,
  },
  {
    id: "C",
    title: "Gestion de Asociación (PRO)",
    img: Rec1,
  },
  {
    id: "D",
    title: "Capacitacion y Noticias (PRO)",
    img: Rec1,
  },
  {
    id: "E",
    title: "Gestion de Integracion de Tecnológia (PRO)",
    img: Rec1,
  },
  {
    id: "F",
    title: "Gestion de Activos Fijos (PRO)",
    img: Rec1,
  },
];

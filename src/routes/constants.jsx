import { Redirect } from "react-router-dom";
import { AuthLayout } from "../layouts/AuthLayout";
import { DashboardLayout } from "../layouts/DashboardLayout";
import { ConfigLayout } from "../layouts/ConfigLayout";
import { ROUTES_DICT } from "./routesDict";

/* routes authentication */
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import EmailVerifiedPage from "../pages/EmailVerifiedPage";
import SetupControlPage from "../pages/SetupControlPage";

/* routes with dashboard layout */
import AnimalControlPage from "../pages/AnimalControlPage";
import AnimalDetailPage from "../pages/AnimalDetailPage";
import ServicePage from "../pages/ServicePage/ServicePage";
import IAMNCreatePage from "../pages/ServicePage/IAMNCreatePage";
import IAMNUpdatePage from "../pages/ServicePage/IAMNUpdatePage";
import EmbryoTransferCreatePage from "../pages/ServicePage/EmbryoTransferCreatePage";
import EmbryoTransferUpdatePage from "../pages/ServicePage/EmbryoTransferUpdatePage";
import ServiceDeletePage from "../pages/ServicePage/ServiceDeletePage";
import PalpationPage from "../pages/PalpationPage";
import BirthPage from "../pages/BirthPage";
import PregnanciesPage from "../pages/PregnanciesPage";
import PedigreePage from "../pages/PedigreePage";
import SemenPage from "../pages/GeneticStock/SemenPage";
import GeneticStockList from "../pages/GeneticStock/GeneticStockList";
import HaciendaConfigurationPage from "../pages/HaciendaConfigurationPage";
import MovementPage from "../pages/GeneticStock/MovementPage";
import MovementCreatePage from "../pages/GeneticStock/MovementCreatePage";
import MovementUpdatePage from "../pages/GeneticStock/MovementUpdatePage";

/* routes with config layout */
import ProfilesControlPage from "../pages/ProfilesControlPage";
import UserControlPage from "../pages/UserControlPage";
import PlanPage from "../pages/PlanPage";
import AccountControlPage from "../pages/AccountControlPage";
import EmbryoCreatePage from "../pages/GeneticStock/EmbryoCreatePage";
import EmbryoUpdatePage from "../pages/GeneticStock/EmbryoUpdatePage";
import SemenCreatePage from "../pages/GeneticStock/SemenCreatePage";
import SemenUpdatePage from "../pages/GeneticStock/SemenUpdatePage";
import DefaultPage from "../components/DefaultPage";

export const ROUTE_TYPES = {
  public: "public",
  private: "private",
};

export const RENDER_ROUTES = [
  {
    path: ROUTES_DICT.service,
    key: "Servicios",
    exact: false,
    component: ServicePage,
    layout: DashboardLayout,
    type: ROUTE_TYPES.private,
    routes: [
      {
        path: ROUTES_DICT.iamnCreate,
        key: "Nuevo IA/MN",
        exact: true,
        component: IAMNCreatePage,
        type: ROUTE_TYPES.private,
      },
      {
        path: ROUTES_DICT.iamnUpdate,
        key: "Editar IA/MN",
        exact: true,
        component: IAMNUpdatePage,
        type: ROUTE_TYPES.private,
      },
      {
        path: ROUTES_DICT.embryoTransferCreate,
        key: "Nueva Transferencia de Embrión",
        exact: true,
        component: EmbryoTransferCreatePage,
        type: ROUTE_TYPES.private,
      },
      {
        parentPathname: ROUTES_DICT.service,
        path: ROUTES_DICT.embryoTransferUpdate,
        key: "Editar Transferencia de Embrión",
        exact: true,
        component: EmbryoTransferUpdatePage,
        type: ROUTE_TYPES.private,
      },
      {
        parentPathname: ROUTES_DICT.service,
        path: ROUTES_DICT.serviceDelete,
        key: "Eliminar Servicio",
        exact: true,
        component: ServiceDeletePage,
        type: ROUTE_TYPES.private,
      },
    ],
  },
  {
    path: ROUTES_DICT.geneticStock.root,
    key: "Stock genético",
    exact: false,
    component: ({ children }) => <>{children()}</>,
    layout: DashboardLayout,
    type: ROUTE_TYPES.private,
    routes: [
      {
        path: ROUTES_DICT.geneticStock.geneticType.root,
        key: "Lista de Stock",
        exact: false,
        component: ({ children }) => (
          <DefaultPage>{(props) => children(props)}</DefaultPage>
        ),
        type: ROUTE_TYPES.private,
        routes: [
          {
            path: ROUTES_DICT.geneticStock.geneticType.list,
            key: "Nuevo stock",
            exact: false,
            component: (props) => <GeneticStockList {...props} />,

            type: ROUTE_TYPES.private,
            routes: [
              {
                path: ROUTES_DICT.geneticStock.geneticType.create,
                key: "Nuevo stock",
                exact: true,
                component: (props) => <EmbryoCreatePage {...props} />,
                type: ROUTE_TYPES.private,
              },
            ],
          },

          /*
          {
            parentPathname: ROUTES_DICT.embryo,
            path: ROUTES_DICT.embryoUpdate,
            key: "Actualizar stock",
            exact: true,
            component: EmbryoUpdatePage,
            type: ROUTE_TYPES.private,
          },
          {
            path: ROUTES_DICT.geneticStock.movements.root,
            key: "Movimientos",
            exact: false,
            component: ({ children }) => <>{children}</>,
            type: ROUTE_TYPES.private,
            routes: [
              {
                path: ROUTES_DICT.geneticStock.movements.list,
                key: "Nuevo movimiento",
                exact: true,
                component: MovementPage,
                type: ROUTE_TYPES.private,
              },
              {
                path: ROUTES_DICT.movementsCreate,
                key: "Nuevo movimiento",
                exact: true,
                component: MovementCreatePage,
                type: ROUTE_TYPES.private,
              },
              {
                path: ROUTES_DICT.movementsUpdate,
                key: "Actualizar movimiento",
                exact: true,
                component: MovementUpdatePage,
                type: ROUTE_TYPES.private,
              },
            ],
          },
          */
        ],
      },
    ],
  },

  /*
  {
    path: ROUTES_DICT.root,
    key: "Dashboard",
    exact: true,
    component: () => <Redirect to={ROUTES_DICT.login} />,
    layout: DashboardLayout,
    type: ROUTE_TYPES.public,
  },
  */

  /*
  {
    path: ROUTES_DICT.movements,
    key: "Movimientos",
    exact: false,
    component: MovementPage,
    layout: DashboardLayout,
    type: ROUTE_TYPES.private,
    routes: [
      {
        path: ROUTES_DICT.movementsCreate,
        key: "Nuevo movimiento",
        exact: true,
        component: MovementCreatePage,
        type: ROUTE_TYPES.private,
      },
      {
        path: ROUTES_DICT.movementsUpdate,
        key: "Actualizar movimiento",
        exact: true,
        component: MovementUpdatePage,
        type: ROUTE_TYPES.private,
      },
    ],
  },
  {
    path: ROUTES_DICT.embryo,
    key: "Embriones",
    exact: false,
    component: EmbryoPage,
    layout: DashboardLayout,
    type: ROUTE_TYPES.private,
    routes: [
      {
        parentPathname: ROUTES_DICT.embryo,
        path: ROUTES_DICT.embryoCreate,
        key: "Nuevo stock",
        exact: false,
        component: EmbryoCreatePage,
        type: ROUTE_TYPES.private,
      },
      {
        parentPathname: ROUTES_DICT.embryo,
        path: ROUTES_DICT.embryoUpdate,
        key: "Actualizar stock",
        exact: true,
        component: EmbryoUpdatePage,
        type: ROUTE_TYPES.private,
      },
    ],
  },
  {
    path: ROUTES_DICT.semen,
    key: "Semen",
    exact: false,
    component: SemenPage,
    layout: DashboardLayout,
    type: ROUTE_TYPES.private,
    routes: [
      {
        parentPathname: ROUTES_DICT.semen,
        path: ROUTES_DICT.semenCreate,
        key: "Nuevo stock",
        exact: true,
        component: SemenCreatePage,
        type: ROUTE_TYPES.private,
      },
      {
        parentPathname: ROUTES_DICT.semen,
        path: ROUTES_DICT.semenUpdate,
        key: "Actualizar stock",
        exact: true,
        component: SemenUpdatePage,
        type: ROUTE_TYPES.private,
      },
    ],
  },
  */
  {
    path: ROUTES_DICT.animalControl,
    key: "Control Animal",
    exact: true,
    component: AnimalControlPage,
    layout: DashboardLayout,
    type: ROUTE_TYPES.private,
  },
  {
    path: ROUTES_DICT.plan,
    key: "Planes",
    exact: true,
    component: PlanPage,
    layout: ConfigLayout,
    type: ROUTE_TYPES.private,
  },
  {
    path: ROUTES_DICT.users,
    key: "Usuarios",
    exact: true,
    component: UserControlPage,
    layout: ConfigLayout,
    type: ROUTE_TYPES.private,
  },
  {
    path: ROUTES_DICT.profile,
    key: "Perfiles",
    exact: true,
    component: ProfilesControlPage,
    layout: ConfigLayout,
    type: ROUTE_TYPES.private,
  },
  {
    path: ROUTES_DICT.account,
    key: "Cuenta",
    exact: true,
    component: AccountControlPage,
    layout: ConfigLayout,
    type: ROUTE_TYPES.private,
  },
  {
    path: ROUTES_DICT.pedigree,
    key: "Control Animal",
    exact: true,
    component: PedigreePage,
    layout: DashboardLayout,
    type: ROUTE_TYPES.private,
  },
  {
    path: ROUTES_DICT.animalDetail + "/:animalId",
    key: "Detalles de animal",
    exact: true,
    component: AnimalDetailPage,
    layout: DashboardLayout,
    type: ROUTE_TYPES.private,
  },
  {
    path: ROUTES_DICT.hacienda,
    key: "Hacienda",
    exact: true,
    component: HaciendaConfigurationPage,
    layout: DashboardLayout,
    type: ROUTE_TYPES.private,
  },
  {
    path: ROUTES_DICT.birth,
    key: "Nacimientos",
    exact: true,
    component: BirthPage,
    layout: DashboardLayout,
    type: ROUTE_TYPES.private,
  },
  {
    path: ROUTES_DICT.palpations,
    key: "Celos",
    exact: true,
    component: PalpationPage,
    layout: DashboardLayout,
    type: ROUTE_TYPES.private,
  },
  {
    path: ROUTES_DICT.pregnancies,
    key: "Celos",
    exact: true,
    component: PregnanciesPage,
    layout: DashboardLayout,
    type: ROUTE_TYPES.private,
  },
  {
    path: ROUTES_DICT.setup,
    key: "Celos",
    exact: true,
    component: SetupControlPage,
    layout: DashboardLayout,
    type: ROUTE_TYPES.private,
  },
  {
    path: ROUTES_DICT.emailVerified + "/:userId",
    key: "Verificacion",
    exact: true,
    component: EmailVerifiedPage,
    layout: AuthLayout,
    type: ROUTE_TYPES.public,
  },

  {
    path: ROUTES_DICT.login,
    key: "Login",
    exact: true,
    component: LoginPage,
    layout: AuthLayout,
    type: ROUTE_TYPES.public,
  },
  {
    path: ROUTES_DICT.register,
    key: "Registro",
    exact: true,
    component: RegisterPage,
    layout: AuthLayout,
    type: ROUTE_TYPES.public,
  },
];

export const ROUTES = [
  //{
  //  path: ROUTES_DICT.dashboard,
  //  key: "Dashboard",
  //  exact: true,
  //  component: () => <Redirect to={ROUTES_DICT.animalControl} />,
  //  layout: DashboardLayout,
  //  type: ROUTE_TYPES.private,
  //},
  //{
  //  path: ROUTES_DICT.root,
  //  key: "Dashboard",
  //  exact: true,
  //  component: () => <Redirect to={ROUTES_DICT.login} />,
  //  layout: DashboardLayout,
  //  type: ROUTE_TYPES.public,
  //},
  //{
  //  path: ROUTES_DICT.animalControl,
  //  key: "Control Animal",
  //  exact: true,
  //  component: AnimalControlPage,
  //  layout: DashboardLayout,
  //  type: ROUTE_TYPES.private,
  //},
  //{
  //  path: ROUTES_DICT.semen,
  //  key: "Semen",
  //  exact: true,
  //  component: SemenPage,
  //  layout: DashboardLayout,
  //  type: ROUTE_TYPES.private,
  //},
  //{
  //  path: ROUTES_DICT.embryo,
  //  key: "Embriones",
  //  exact: true,
  //  component: EmbryoPage,
  //  layout: DashboardLayout,
  //  type: ROUTE_TYPES.private,
  //},
  {
    path: ROUTES_DICT.iamnCreate,
    key: "IA/MN",
    exact: true,
    component: IAMNCreatePage,
    layout: DashboardLayout,
    type: ROUTE_TYPES.private,
  },
  {
    path: ROUTES_DICT.iamnUpdate,
    key: "IA/MN",
    exact: true,
    component: IAMNCreatePage,
    layout: DashboardLayout,
    type: ROUTE_TYPES.private,
  },
  {
    path: ROUTES_DICT.service,
    key: "Servicios",
    exact: true,
    component: ServicePage,
    layout: DashboardLayout,
    type: ROUTE_TYPES.private,
  },
  {
    path: ROUTES_DICT.movements,
    key: "Movimientos",
    exact: false,
    component: MovementPage,
    layout: DashboardLayout,
    type: ROUTE_TYPES.private,
  },
  {
    path: ROUTES_DICT.movementsCreate,
    key: "Nuevo movimiento",
    exact: true,
    component: MovementCreatePage,
    layout: DashboardLayout,
    type: ROUTE_TYPES.private,
    parent: ROUTES_DICT.movements,
  },
];

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
import AnimalDetailPage from "../pages/AnimalDetailPage";
import ServicePageList from "../pages/Services/ServicePageList";
import IAMNCreatePage from "../pages/Services/IAMNCreatePage";
import IAMNUpdatePage from "../pages/Services/IAMNUpdatePage";
import EmbryoTransferCreatePage from "../pages/Services/EmbryoTransferCreatePage";
import EmbryoTransferUpdatePage from "../pages/Services/EmbryoTransferUpdatePage";
import ServiceDeletePage from "../pages/Services/ServiceDeletePage";
import PalpationPage from "../pages/PalpationPage";
import BirthPage from "../pages/Birth";
import PregnanciesPage from "../pages/PregnanciesPage";
import PedigreePage from "../pages/PedigreePage";
import GeneticStockList from "../pages/GeneticStock/GeneticStockList";
import HaciendaConfigurationPage from "../pages/HaciendaConfigurationPage";
import MovementCreatePage from "../pages/GeneticStock/MovementCreatePage";
import AnimalListPage from "../pages/AnimalControl/AnimalListPage";
import AnimalCreatePage from "../pages/AnimalControl/AnimalCreatePage";

/* routes with config layout */
import ProfilesControlPage from "../pages/ProfilesControlPage";
import UserControlPage from "../pages/UserControlPage";
import PlanPage from "../pages/PlanPage";
import AccountControlPage from "../pages/AccountControlPage";
import GeneticStockCreatePage from "../pages/GeneticStock/GeneticStockCreatePage";
import GeneticStockUpdatePage from "../pages/GeneticStock/GeneticStockUpdatePage";
import GeneticStockDeletePage from "../pages/GeneticStock/GeneticStockDeletePage";
import DefaultPage from "../components/DefaultPage";
import MovementPageList from "../pages/GeneticStock/MovementPageList";
import { serviceRouteOptions } from "../pages/Services/constants";
import AnimalUpdatePage from "../pages/AnimalControl/AnimalUpdatePage";
import BirthListPage from "../pages/Birth/BirthListPage";
import { birthChipOptions } from "../pages/Birth/constants";
import BirthCreatePage from "../pages/Birth/BirthCreatePage";
import AnimalDeletePage from "../pages/AnimalControl/AnimalDeletePage";

export const ROUTE_TYPES = {
  public: "public",
  private: "private",
};

export const RENDER_ROUTES = [
  /**
   * Rutas relacionadas al Módulo de nacimientos
   */
  {
    path: ROUTES_DICT.birth.root,
    key: "Nacimientos",
    exact: false,
    //component: BirthPage,
    layout: DashboardLayout,
    type: ROUTE_TYPES.private,
    component: ({ children }) => (
      <DefaultPage title="Nacimientos" chipList={birthChipOptions()}>
        {(props) => children(props)}
      </DefaultPage>
    ),
    routes: [
      {
        path: ROUTES_DICT.birth.list,
        key: "Lista de nacimientos",
        exact: false,
        component: (props) => <BirthListPage {...props} />,
        type: ROUTE_TYPES.private,
        routes: [
          {
            path: ROUTES_DICT.birth.create,
            key: "Nuevo nacimiento",
            exact: true,
            component: (props) => <BirthCreatePage {...props} />,
            type: ROUTE_TYPES.private,
          },
          {
            path: ROUTES_DICT.birth.update,
            key: "Actualizar nacimiento",
            exact: true,
            component: (props) => <BirthCreatePage {...props} />,
            type: ROUTE_TYPES.private,
          },
          {
            path: ROUTES_DICT.birth.delete,
            key: "Actualizar nacimiento",
            exact: true,
            component: (props) => <BirthCreatePage {...props} />,
            type: ROUTE_TYPES.private,
          },
        ],
      },
    ],
  },
  /**
   * Rutas relacionadas al Módulo de servicios
   */
  {
    path: ROUTES_DICT.service.root,
    key: "Servicios",
    exact: false,
    //component: ({ children }) => <>{children()}</>,
    component: ({ children }) => (
      <DefaultPage title="Servicios" chipList={serviceRouteOptions()}>
        {(props) => children(props)}
      </DefaultPage>
    ),
    layout: DashboardLayout,
    type: ROUTE_TYPES.private,
    routes: [
      {
        path: ROUTES_DICT.service.list,
        key: "Lista de Servicios",
        exact: false,
        component: (props) => <ServicePageList {...props} />,
        type: ROUTE_TYPES.private,
        routes: [
          {
            path: ROUTES_DICT.service.createIAMN,
            key: "Nuevo IA/MN",
            exact: true,
            component: (props) => <IAMNCreatePage {...props} />,
            type: ROUTE_TYPES.private,
          },
          {
            path: ROUTES_DICT.service.createET,
            key: "Nuevo IA/MN",
            exact: true,
            component: (props) => <EmbryoTransferCreatePage {...props} />,
            type: ROUTE_TYPES.private,
          },
          {
            path: ROUTES_DICT.service.updateIAMN,
            key: "Editar IA/MN",
            exact: true,
            component: (props) => <IAMNUpdatePage {...props} />,
            type: ROUTE_TYPES.private,
          },
          {
            path: ROUTES_DICT.service.updateET,
            key: "Editar Transferencia de embriones",
            exact: true,
            component: (props) => <EmbryoTransferUpdatePage {...props} />,
            type: ROUTE_TYPES.private,
          },
          {
            path: ROUTES_DICT.service.delete,
            key: "Eliminar servicio",
            exact: true,
            component: (props) => <ServiceDeletePage {...props} />,
            type: ROUTE_TYPES.private,
          },
        ],
      },
      //{
      //  path: ROUTES_DICT.iamnCreate,
      //  key: "Nuevo IA/MN",
      //  exact: true,
      //  component: IAMNCreatePage,
      //  type: ROUTE_TYPES.private,
      //},
      //{
      //  path: ROUTES_DICT.iamnUpdate,
      //  key: "Editar IA/MN",
      //  exact: true,
      //  component: IAMNUpdatePage,
      //  type: ROUTE_TYPES.private,
      //},
      //{
      //  path: ROUTES_DICT.embryoTransferCreate,
      //  key: "Nueva Transferencia de Embrión",
      //  exact: true,
      //  component: EmbryoTransferCreatePage,
      //  type: ROUTE_TYPES.private,
      //},
      //{
      //  path: ROUTES_DICT.embryoTransferUpdate,
      //  key: "Editar Transferencia de Embrión",
      //  exact: true,
      //  component: EmbryoTransferUpdatePage,
      //  type: ROUTE_TYPES.private,
      //},
      //{
      //  path: ROUTES_DICT.serviceDelete,
      //  key: "Eliminar Servicio",
      //  exact: true,
      //  component: ServiceDeletePage,
      //  type: ROUTE_TYPES.private,
      //},
    ],
  },
  /**
   * Rutas relacionadas al Módulo de stock genético
   */
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
                component: (props) => <GeneticStockCreatePage {...props} />,
                type: ROUTE_TYPES.private,
              },
              {
                path: ROUTES_DICT.geneticStock.geneticType.update,
                key: "Editar stock",
                exact: true,
                component: (props) => <GeneticStockUpdatePage {...props} />,
                type: ROUTE_TYPES.private,
              },
              {
                path: ROUTES_DICT.geneticStock.geneticType.delete,
                key: "Eliminar stock",
                exact: true,
                component: (props) => <GeneticStockDeletePage {...props} />,
                type: ROUTE_TYPES.private,
              },
            ],
          },
          {
            path: ROUTES_DICT.geneticStock.movements.list,
            key: "Movimientos",
            exact: false,
            component: (props) => <MovementPageList {...props} />,
            type: ROUTE_TYPES.private,
            routes: [
              {
                path: ROUTES_DICT.geneticStock.movements.create,
                key: "Movimientos",
                exact: true,
                component: (props) => <MovementCreatePage {...props} />,
                type: ROUTE_TYPES.private,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    path: ROUTES_DICT.animal.root,
    key: "Control animal",
    exact: false,
    component: ({ children }) => <>{children()}</>,
    layout: DashboardLayout,
    type: ROUTE_TYPES.private,
    routes: [
      {
        path: ROUTES_DICT.animal.root,
        key: "Lista de animales",
        exact: false,
        component: ({ children }) => (
          <DefaultPage>{(props) => children(props)}</DefaultPage>
        ),
        type: ROUTE_TYPES.private,
        routes: [
          {
            path: ROUTES_DICT.animal.list,
            key: "Nuevo animal",
            exact: false,
            component: (props) => <AnimalListPage {...props} />,
            type: ROUTE_TYPES.private,
            routes: [
              {
                path: ROUTES_DICT.animal.create,
                key: "Nuevo animal",
                exact: true,
                component: (props) => <AnimalCreatePage {...props} />,
                type: ROUTE_TYPES.private,
              },
              {
                path: ROUTES_DICT.animal.update,
                key: "Editar animal",
                exact: true,
                component: (props) => <AnimalUpdatePage {...props} />,
                type: ROUTE_TYPES.private,
              },
              {
                path: ROUTES_DICT.animal.delete,
                key: "Eliminar animal",
                exact: true,
                component: (props) => <AnimalDeletePage {...props} />,
                type: ROUTE_TYPES.private,
              },
            ],
          },
        ],
      },
    ],
  },
  /**
   * Rutas relacionadas al Módulo de control de animales
   */
  // {
  //   path: ROUTES_DICT.animal.list,
  //   key: "Control Animal",
  //   exact: true,
  //   component: AnimalControlPage,
  //   layout: DashboardLayout,
  //   type: ROUTE_TYPES.private,
  // },
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
  /**
   * Rutas relacionadas al Módulo de usuarios y planes
   */
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
  /**
   * Rutas relacionadas al Módulo de autentificacion
   */
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
  /**
   * Rutas relacionadas al Módulo de gestion de haciendas y agronegocios
   */
  {
    path: ROUTES_DICT.hacienda,
    key: "Hacienda",
    exact: true,
    component: HaciendaConfigurationPage,
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
  /**
   * Rutas relacionadas al Módulo de palpaciones
   */
  {
    path: ROUTES_DICT.palpations,
    key: "Celos",
    exact: true,
    component: PalpationPage,
    layout: DashboardLayout,
    type: ROUTE_TYPES.private,
  },
  /**
   * Rutas relacionadas al Módulo de preñeces
   */
  {
    path: ROUTES_DICT.pregnancies,
    key: "Celos",
    exact: true,
    component: PregnanciesPage,
    layout: DashboardLayout,
    type: ROUTE_TYPES.private,
  },
];

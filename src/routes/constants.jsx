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
import ZealListPage from "../pages/Collective/Zeal/ZealListPage";
import ZealCreatePage from "../pages/Collective/Zeal/ZealCreatePage";
import ZealUpdatePage from "../pages/Collective/Zeal/ZealUpdatePage";
import ZealDeletePage from "../pages/Collective/Zeal/ZealDeletePage";
import WeightListPage from "../pages/Collective/Weight/WeightListPage";
import WeightCreatePage from "../pages/Collective/Weight/WeightCreatePage";
import WeightUpdatePage from "../pages/Collective/Weight/WeightUpdatePage";
import WeightDeletePage from "../pages/Collective/Weight/WeightDeletePage";
import SaleListPage from "../pages/Collective/Sale/SaleListPage";
import SaleCreatePage from "../pages/Collective/Sale/SaleCreatePage";
import SaleUpdatePage from "../pages/Collective/Sale/SaleUpdatePage";
import SaleDeletePage from "../pages/Collective/Sale/SaleDeletePage";
import AssociationListPage from "../pages/Collective/Association/AssociationListPage";
import AssociationDeletePage from "../pages/Collective/Association/AssociationDeletePage";
import AssociationUpdatePage from "../pages/Collective/Association/AssociationUpdatePage";
import AssociationCreatePage from "../pages/Collective/Association/AssociationCreatePage";
import DryingListPage from "../pages/Collective/Drying/DryingListPage";
import DryingCreatePage from "../pages/Collective/Drying/DryingCreatePage";
import DryingUpdatePage from "../pages/Collective/Drying/DryingUpdatePage";
import DryingDeletePage from "../pages/Collective/Drying/DryingDeletePage";

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
  /**
   * Rutas relacionadas al Módulo de control de animales
   */
  {
    path: ROUTES_DICT.animal.root,
    key: "Control Animal",
    exact: false,
    component: ({ children }) => (
      <DefaultPage>{(props) => children(props)}</DefaultPage>
    ),
    layout: DashboardLayout,
    type: ROUTE_TYPES.private,
    routes: [
      {
        path: ROUTES_DICT.animal.list,
        key: "Lista de animales",
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
  /**
   * Rutas relacionadas al Módulo de colectivas
   */
  {
    path: ROUTES_DICT.collective.root,
    key: "Colectiva",
    exact: false,
    component: ({ children }) => <>{children()}</>,
    layout: DashboardLayout,
    type: ROUTE_TYPES.private,
    routes: [
      {
        path: ROUTES_DICT.collective.root,
        key: "Celos",
        exact: false,
        component: ({ children }) => (
          <DefaultPage>{(props) => children(props)}</DefaultPage>
        ),
        type: ROUTE_TYPES.private,
        routes: [
          {
            path: ROUTES_DICT.collective.zeal.list,
            key: "Lista de Celos",
            exact: false,
            component: (props) => <ZealListPage {...props} />,
            type: ROUTE_TYPES.private,
            routes: [
              {
                path: ROUTES_DICT.collective.zeal.create,
                key: "Nuevo celo",
                exact: true,
                component: (props) => <ZealCreatePage {...props} />,
                type: ROUTE_TYPES.private,
              },
              {
                path: ROUTES_DICT.collective.zeal.update,
                key: "Editar celo",
                exact: true,
                component: (props) => <ZealUpdatePage {...props} />,
                type: ROUTE_TYPES.private,
              },
              {
                path: ROUTES_DICT.collective.zeal.delete,
                key: "Eliminar celo",
                exact: true,
                component: (props) => <ZealDeletePage {...props} />,
                type: ROUTE_TYPES.private,
              },
            ],
          },
          {
            path: ROUTES_DICT.collective.weight.list,
            key: "Lista de pesos",
            exact: false,
            component: (props) => <WeightListPage {...props} />,
            type: ROUTE_TYPES.private,
            routes: [
              {
                path: ROUTES_DICT.collective.weight.create,
                key: "Nuevo peso",
                exact: true,
                component: (props) => <WeightCreatePage {...props} />,
                type: ROUTE_TYPES.private,
              },
              {
                path: ROUTES_DICT.collective.weight.update,
                key: "Editar peso",
                exact: true,
                component: (props) => <WeightUpdatePage {...props} />,
                type: ROUTE_TYPES.private,
              },
              {
                path: ROUTES_DICT.collective.weight.delete,
                key: "Eliminar peso",
                exact: true,
                component: (props) => <WeightDeletePage {...props} />,
                type: ROUTE_TYPES.private,
              },
            ],
          },
          {
            path: ROUTES_DICT.collective.sale.list,
            key: "Lista de ventas",
            exact: false,
            component: (props) => <SaleListPage {...props} />,
            type: ROUTE_TYPES.private,
            routes: [
              {
                path: ROUTES_DICT.collective.sale.create,
                key: "Nueva venta",
                exact: true,
                component: (props) => <SaleCreatePage {...props} />,
                type: ROUTE_TYPES.private,
              },
              {
                path: ROUTES_DICT.collective.sale.update,
                key: "Editar venta",
                exact: true,
                component: (props) => <SaleUpdatePage {...props} />,
                type: ROUTE_TYPES.private,
              },
              {
                path: ROUTES_DICT.collective.sale.delete,
                key: "Eliminar venta",
                exact: true,
                component: (props) => <SaleDeletePage {...props} />,
                type: ROUTE_TYPES.private,
              },
            ],
          },
          {
            path: ROUTES_DICT.collective.association.list,
            key: "Lista de asociacion",
            exact: false,
            component: (props) => <AssociationListPage {...props} />,
            type: ROUTE_TYPES.private,
            routes: [
              {
                path: ROUTES_DICT.collective.association.create,
                key: "Nuevo registro de asociacion",
                exact: true,
                component: (props) => <AssociationCreatePage {...props} />,
                type: ROUTE_TYPES.private,
              },
              {
                path: ROUTES_DICT.collective.association.update,
                key: "Editar registro de asociacion",
                exact: true,
                component: (props) => <AssociationUpdatePage {...props} />,
                type: ROUTE_TYPES.private,
              },
              {
                path: ROUTES_DICT.collective.association.delete,
                key: "Eliminar registro de asociacion",
                exact: true,
                component: (props) => <AssociationDeletePage {...props} />,
                type: ROUTE_TYPES.private,
              },
            ],
          },
          {
            path: ROUTES_DICT.collective.drying.list,
            key: "Lista de secado/desteste",
            exact: false,
            component: (props) => <DryingListPage {...props} />,
            type: ROUTE_TYPES.private,
            routes: [
              {
                path: ROUTES_DICT.collective.drying.create,
                key: "Nuevo secado/desteste",
                exact: true,
                component: (props) => <DryingCreatePage {...props} />,
                type: ROUTE_TYPES.private,
              },
              {
                path: ROUTES_DICT.collective.drying.update,
                key: "Editar secado/desteste",
                exact: true,
                component: (props) => <DryingUpdatePage {...props} />,
                type: ROUTE_TYPES.private,
              },
              {
                path: ROUTES_DICT.collective.drying.delete,
                key: "Eliminar secado/desteste",
                exact: true,
                component: (props) => <DryingDeletePage {...props} />,
                type: ROUTE_TYPES.private,
              },
            ],
          },
        ],
      },
      // {
      //   path: ROUTES_DICT.collective.root,
      //   key: "Celos",
      //   exact: false,
      //   component: ({ children }) => (
      //     <DefaultPage>{(props) => children(props)}</DefaultPage>
      //   ),
      //   type: ROUTE_TYPES.private,
      //   routes: [
      //     {
      //       path: ROUTES_DICT.collective.weight,
      //       key: "Lista de pesos",
      //       exact: false,
      //       component: (props) => <ZealListPage {...props} />,
      //       type: ROUTE_TYPES.private,
      //       routes: [
      //         {
      //           path: ROUTES_DICT.collective.weight.create,
      //           key: "Nuevo peso",
      //           exact: true,
      //           component: (props) => <AnimalCreatePage {...props} />,
      //           type: ROUTE_TYPES.private,
      //         },
      //         {
      //           path: ROUTES_DICT.collective.weight.update,
      //           key: "Editar peso",
      //           exact: true,
      //           component: (props) => <AnimalUpdatePage {...props} />,
      //           type: ROUTE_TYPES.private,
      //         },
      //         {
      //           path: ROUTES_DICT.collective.weight.delete,
      //           key: "Eliminar peso",
      //           exact: true,
      //           component: (props) => <AnimalDeletePage {...props} />,
      //           type: ROUTE_TYPES.private,
      //         },
      //       ],
      //     },
      //   ],
      // },
      // {
      //   path: ROUTES_DICT.collective.root,
      //   key: "Celos",
      //   exact: false,
      //   component: ({ children }) => (
      //     <DefaultPage>{(props) => children(props)}</DefaultPage>
      //   ),
      //   type: ROUTE_TYPES.private,
      //   routes: [
      //     {
      //       path: ROUTES_DICT.collective.sale.list,
      //       key: "Lista de ventas",
      //       exact: false,
      //       component: (props) => <ZealListPage {...props} />,
      //       type: ROUTE_TYPES.private,
      //       routes: [
      //         {
      //           path: ROUTES_DICT.collective.sale.create,
      //           key: "Nueva venta",
      //           exact: true,
      //           component: (props) => <AnimalCreatePage {...props} />,
      //           type: ROUTE_TYPES.private,
      //         },
      //         {
      //           path: ROUTES_DICT.collective.sale.update,
      //           key: "Editar venta",
      //           exact: true,
      //           component: (props) => <AnimalUpdatePage {...props} />,
      //           type: ROUTE_TYPES.private,
      //         },
      //         {
      //           path: ROUTES_DICT.collective.sale.delete,
      //           key: "Eliminar venta",
      //           exact: true,
      //           component: (props) => <AnimalDeletePage {...props} />,
      //           type: ROUTE_TYPES.private,
      //         },
      //       ],
      //     },
      //   ],
      // },
      // {
      //   path: ROUTES_DICT.collective.root,
      //   key: "Celos",
      //   exact: false,
      //   component: ({ children }) => (
      //     <DefaultPage>{(props) => children(props)}</DefaultPage>
      //   ),
      //   type: ROUTE_TYPES.private,
      //   routes: [
      //     {
      //       path: ROUTES_DICT.collective.association.list,
      //       key: "Lista de asociacion",
      //       exact: false,
      //       component: (props) => <AnimalListPage {...props} />,
      //       type: ROUTE_TYPES.private,
      //       routes: [
      //         {
      //           path: ROUTES_DICT.collective.association.create,
      //           key: "Nuevo registro de asociacion",
      //           exact: true,
      //           component: (props) => <AnimalCreatePage {...props} />,
      //           type: ROUTE_TYPES.private,
      //         },
      //         {
      //           path: ROUTES_DICT.collective.association.update,
      //           key: "Editar registro de asociacion",
      //           exact: true,
      //           component: (props) => <AnimalUpdatePage {...props} />,
      //           type: ROUTE_TYPES.private,
      //         },
      //         {
      //           path: ROUTES_DICT.collective.association.delete,
      //           key: "Eliminar registro de asociacion",
      //           exact: true,
      //           component: (props) => <AnimalDeletePage {...props} />,
      //           type: ROUTE_TYPES.private,
      //         },
      //       ],
      //     },
      //   ],
      // },
      // {
      //   path: ROUTES_DICT.collective.root,
      //   key: "Celos",
      //   exact: false,
      //   component: ({ children }) => (
      //     <DefaultPage>{(props) => children(props)}</DefaultPage>
      //   ),
      //   type: ROUTE_TYPES.private,
      //   routes: [
      //     {
      //       path: ROUTES_DICT.collective.drying.list,
      //       key: "Lista de secado/desteste",
      //       exact: false,
      //       component: (props) => <AnimalListPage {...props} />,
      //       type: ROUTE_TYPES.private,
      //       routes: [
      //         {
      //           path: ROUTES_DICT.collective.drying.create,
      //           key: "Nuevo secado/desteste",
      //           exact: true,
      //           component: (props) => <AnimalCreatePage {...props} />,
      //           type: ROUTE_TYPES.private,
      //         },
      //         {
      //           path: ROUTES_DICT.collective.drying.update,
      //           key: "Editar secado/desteste",
      //           exact: true,
      //           component: (props) => <AnimalUpdatePage {...props} />,
      //           type: ROUTE_TYPES.private,
      //         },
      //         {
      //           path: ROUTES_DICT.collective.drying.delete,
      //           key: "Eliminar secado/desteste",
      //           exact: true,
      //           component: (props) => <AnimalDeletePage {...props} />,
      //           type: ROUTE_TYPES.private,
      //         },
      //       ],
      //     },
      //   ],
      // },
    ],
  },

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

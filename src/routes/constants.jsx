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
import ServicePage from "../pages/ServicePage/ServiceTablePage";
import IAMNFormPage from "../pages/ServicePage/IAMNFormPage";
import EmbryoTransferFormPage from "../pages/ServicePage/EmbryoTransferFormPage";
import PalpationPage from "../pages/PalpationPage";
import BirthPage from "../pages/BirthPage";
import PregnanciesPage from "../pages/PregnanciesPage";
import PedigreePage from "../pages/PedigreePage";
import SemenPage from "../pages/GeneticStock/SemenPage";
import EmbryoPage from "../pages/GeneticStock/EmbryoPage";
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
        parentPathname: ROUTES_DICT.service,
        path: ROUTES_DICT.iamnCreate,
        key: "Nuevo IA/MN",
        exact: true,
        component: IAMNFormPage,
        type: ROUTE_TYPES.private,
      },
      {
        parentPathname: ROUTES_DICT.service,
        path: ROUTES_DICT.iamnUpdate,
        key: "Editar IA/MN",
        exact: true,
        component: IAMNFormPage,
        type: ROUTE_TYPES.private,
      },
      {
        parentPathname: ROUTES_DICT.service,
        path: ROUTES_DICT.embryoTransferCreate,
        key: "Nueva Transferencia de Embrión",
        exact: true,
        component: EmbryoTransferFormPage,
        type: ROUTE_TYPES.private,
      },
      {
        parentPathname: ROUTES_DICT.service,
        path: ROUTES_DICT.embryoTransferUpdate,
        key: "Editar Transferencia de Embrión",
        exact: true,
        component: EmbryoTransferFormPage,
        type: ROUTE_TYPES.private,
      },
    ],
  },
  {
    path: ROUTES_DICT.movements,
    key: "Movimientos",
    exact: false,
    component: MovementPage,
    layout: DashboardLayout,
    type: ROUTE_TYPES.private,
    routes: [
      {
        parentPathname: ROUTES_DICT.movements,
        path: ROUTES_DICT.movementsCreate,
        key: "Nuevo movimiento",
        exact: true,
        component: MovementCreatePage,
        type: ROUTE_TYPES.private,
      },
      {
        parentPathname: ROUTES_DICT.movements,
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
        exact: true,
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
  {
    path: ROUTES_DICT.animalControl,
    key: "Control Animal",
    exact: false,
    component: AnimalControlPage,
    layout: DashboardLayout,
    type: ROUTE_TYPES.private,
  },
  //{
  //  path: ROUTES_DICT.plan,
  //  key: "Planes",
  //  exact: false,
  //  component: PlanPage,
  //  layout: ConfigLayout,
  //  type: ROUTE_TYPES.private,
  //},
  //{
  //  path: ROUTES_DICT.users,
  //  key: "Usuarios",
  //  exact: false,
  //  component: UserControlPage,
  //  layout: ConfigLayout,
  //  type: ROUTE_TYPES.private,
  //},
  //{
  //  path: ROUTES_DICT.profile,
  //  key: "Perfiles",
  //  exact: false,
  //  component: ProfilesControlPage,
  //  layout: ConfigLayout,
  //  type: ROUTE_TYPES.private,
  //},
  //{
  //  path: ROUTES_DICT.account,
  //  key: "Cuenta",
  //  exact: false,
  //  component: AccountControlPage,
  //  layout: ConfigLayout,
  //  type: ROUTE_TYPES.private,
  //},
  //{
  //  path: ROUTES_DICT.pedigree,
  //  key: "Control Animal",
  //  exact: false,
  //  component: PedigreePage,
  //  layout: DashboardLayout,
  //  type: ROUTE_TYPES.private,
  //},
  //{
  //  path: ROUTES_DICT.animalDetail + "/:animalId",
  //  key: "Detalles de animal",
  //  exact: false,
  //  component: AnimalDetailPage,
  //  layout: DashboardLayout,
  //  type: ROUTE_TYPES.private,
  //},
  //{
  //  path: ROUTES_DICT.hacienda,
  //  key: "Hacienda",
  //  exact: false,
  //  component: HaciendaConfigurationPage,
  //  layout: DashboardLayout,
  //  type: ROUTE_TYPES.private,
  //},
  //{
  //path: ROUTES_DICT.birth,
  //key: "Nacimientos",
  //exact: false,
  //component: BirthPage,
  //layout: DashboardLayout,
  //type: ROUTE_TYPES.private,
  //},
  //{
  //path: ROUTES_DICT.palpations,
  //key: "Celos",
  //exact: false,
  //component: PalpationPage,
  //layout: DashboardLayout,
  //type: ROUTE_TYPES.private,
  //},
  //{
  //path: ROUTES_DICT.pregnancies,
  //key: "Celos",
  //exact: false,
  //component: PregnanciesPage,
  //layout: DashboardLayout,
  //type: ROUTE_TYPES.private,
  //},
  //{
  //path: ROUTES_DICT.setup,
  //key: "Celos",
  //exact: false,
  //component: SetupControlPage,
  //layout: DashboardLayout,
  //type: ROUTE_TYPES.private,
  //},
  //{
  //path: ROUTES_DICT.emailVerified + "/:userId",
  //key: "Verificacion",
  //exact: false,
  //component: EmailVerifiedPage,
  //layout: AuthLayout,
  //type: ROUTE_TYPES.private,
  //},

  //{
  //path: ROUTES_DICT.login,
  //key: "Login",
  //exact: false,
  //component: LoginPage,
  //layout: AuthLayout,
  //type: ROUTE_TYPES.private,
  //},
  //{
  //path: ROUTES_DICT.register,
  //key: "Registro",
  //exact: false,
  //component: RegisterPage,
  //layout: AuthLayout,
  //type: ROUTE_TYPES.private,
  //},
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
    component: IAMNFormPage,
    layout: DashboardLayout,
    type: ROUTE_TYPES.private,
  },
  {
    path: ROUTES_DICT.iamnUpdate,
    key: "IA/MN",
    exact: true,
    component: IAMNFormPage,
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

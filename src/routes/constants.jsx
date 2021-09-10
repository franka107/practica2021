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
import PalpationPage from "../pages/PalpationPage";
import BirthPage from "../pages/BirthPage";
import PregnanciesPage from "../pages/PregnanciesPage";
import PedigreePage from "../pages/PedigreePage";
import SemenPage from "../pages/GeneticStock/SemenPage";
import EmbryoPage from "../pages/GeneticStock/EmbryoPage";
import HaciendaConfigurationPage from "../pages/HaciendaConfigurationPage";
import MovementPage from "../pages/GeneticStock/MovementPage";
import MovementCreatePage from "../pages/GeneticStock/MovementCreatePage";

/* routes with config layout */
import ProfilesControlPage from "../pages/ProfilesControlPage";
import UserControlPage from "../pages/UserControlPage";
import PlanPage from "../pages/PlanPage";
import AccountControlPage from "../pages/AccountControlPage";

export const ROUTE_TYPES = {
  public: "public",
  private: "private",
};

export const RENDER_ROUTES = [
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
    ],
  },

  {
    path: ROUTES_DICT.animalControl,
    key: "Control Animal",
    exact: true,
    component: AnimalControlPage,
    layout: DashboardLayout,
    type: ROUTE_TYPES.private,
  },
  {
    path: ROUTES_DICT.embryo,
    key: "Embriones",
    exact: true,
    component: EmbryoPage,
    layout: DashboardLayout,
    type: ROUTE_TYPES.private,
  },
];

export const ROUTES = [
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
  {
    path: ROUTES_DICT.dashboard,
    key: "Dashboard",
    exact: true,
    component: () => <Redirect to={ROUTES_DICT.animalControl} />,
    layout: DashboardLayout,
    type: ROUTE_TYPES.private,
  },
  {
    path: ROUTES_DICT.root,
    key: "Dashboard",
    exact: true,
    component: () => <Redirect to={ROUTES_DICT.login} />,
    layout: DashboardLayout,
    type: ROUTE_TYPES.public,
  },
  {
    path: ROUTES_DICT.animalControl,
    key: "Control Animal",
    exact: true,
    component: AnimalControlPage,
    layout: DashboardLayout,
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
    path: ROUTES_DICT.semen,
    key: "Semen",
    exact: true,
    component: SemenPage,
    layout: DashboardLayout,
    type: ROUTE_TYPES.private,
  },
  {
    path: ROUTES_DICT.embryo,
    key: "Embriones",
    exact: true,
    component: EmbryoPage,
    layout: DashboardLayout,
    type: ROUTE_TYPES.private,
  },
  {
    path: ROUTES_DICT.iamnCreate,
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

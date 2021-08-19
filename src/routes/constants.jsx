import { Redirect } from "react-router-dom";
import { AuthLayout } from "../layouts/AuthLayout";
import { DashboardLayout } from "../layouts/DashboardLayout";
import AnimalControlPage from "../pages/AnimalControlPage";
import AnimalDetailPage from "../pages/AnimalDetailPage";
import ServicePage from "../pages/ServicePage";
import PalpationPage from "../pages/PalpationPage";
import BirthPage from "../pages/BirthPage";
import PregnanciesPage from "../pages/PregnanciesPage";
import SetupControlPage from "../pages/SetupControlPage";
import EmailVerifiedPage from "../pages/EmailVerifiedPage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import { ROUTES_DICT } from "./routesDict";

export const ROUTE_TYPES = {
  public: "public",
  private: "private",
};

export const ROUTES = [
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
    type: ROUTE_TYPES.public,
  },
  {
    path: ROUTES_DICT.animalControl,
    key: "Control Animal",
    exact: true,
    component: AnimalControlPage,
    layout: DashboardLayout,
    type: ROUTE_TYPES.public,
  },
  {
    path: ROUTES_DICT.animalDetail + "/:animalId",
    key: "Detalles de animal",
    exact: true,
    component: AnimalDetailPage,
    layout: DashboardLayout,
    type: ROUTE_TYPES.public,
  },

  {
    path: ROUTES_DICT.service,
    key: "Celos",
    exact: true,
    component: ServicePage,
    layout: DashboardLayout,
    type: ROUTE_TYPES.public,
  },
  {
    path: ROUTES_DICT.birth,
    key: "Nacimientos",
    exact: true,
    component: BirthPage,
    layout: DashboardLayout,
    type: ROUTE_TYPES.public,
  },
  {
    path: ROUTES_DICT.palpations,
    key: "Celos",
    exact: true,
    component: PalpationPage,
    layout: DashboardLayout,
    type: ROUTE_TYPES.public,
  },
  {
    path: ROUTES_DICT.pregnancies,
    key: "Celos",
    exact: true,
    component: PregnanciesPage,
    layout: DashboardLayout,
    type: ROUTE_TYPES.public,
  },
  {
    path: ROUTES_DICT.setup,
    key: "Celos",
    exact: true,
    component: SetupControlPage,
    layout: DashboardLayout,
    type: ROUTE_TYPES.public,
  },
  {
    path: ROUTES_DICT.emailVerified,
    key: "Celos",
    exact: true,
    component: EmailVerifiedPage,
    layout: DashboardLayout,
    type: ROUTE_TYPES.public,
  },
];

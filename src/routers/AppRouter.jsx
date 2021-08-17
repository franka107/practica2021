import React from "react";
import { HashRouter as Router, Switch, Redirect } from "react-router-dom";
import { AuthLayout } from "../layouts/AuthLayout";
import { DashboardLayout } from "../layouts/DashboardLayout";
import { ConfigLayout } from "../layouts/ConfigLayout";
import LoginPage from "../pages/LoginPage";
import { PublicRoute } from "./PublicRoute";
import routesDictionary from "./routesDict";
import { GlobalSnackbar } from "../components/GlobalSnackbar";
import RegisterPage from "../pages/RegisterPage";
import AnimalControlPage from "../pages/AnimalControlPage";
import SetupControlPage from "../pages/SetupControlPage";
import PregnanciesPage from "../pages/PregnanciesPage";
import PalpationPage from "../pages/PalpationPage";
import BirthPage from "../pages/BirthPage";
import ServicePage from "../pages/ServicePage";

export const AppRouter = () => {
  return (
    <Router>
      <div>
        <GlobalSnackbar></GlobalSnackbar>
        <Switch>
          {/* <PublicRoute
            component={() => <p>Probando</p>}
            layout={ConfigLayout}
            path={routesDictionary.test}
            isAuthenticated={false}
          /> */}
          <PublicRoute
            component={ServicePage}
            layout={DashboardLayout}
            path={routesDictionary.service}
            isAuthenticated={false}
          />
          <PublicRoute
            component={BirthPage}
            layout={DashboardLayout}
            path={routesDictionary.birth}
            isAuthenticated={false}
          />
          <PublicRoute
            component={PalpationPage}
            layout={DashboardLayout}
            path={routesDictionary.palpations}
            isAuthenticated={false}
          />
          <PublicRoute
            component={PregnanciesPage}
            layout={DashboardLayout}
            path={routesDictionary.pregnancies}
            isAuthenticated={false}
          />
          <PublicRoute
            component={AnimalControlPage}
            layout={DashboardLayout}
            path={routesDictionary.animalControl}
            isAuthenticated={false}
          />
          <PublicRoute
            component={SetupControlPage}
            layout={DashboardLayout}
            path={routesDictionary.setup}
            isAuthenticated={false}
          />

          <PublicRoute
            component={RegisterPage}
            layout={AuthLayout}
            path={routesDictionary.register}
            isAuthenticated={false}
          />
          <PublicRoute
            component={LoginPage}
            layout={AuthLayout}
            path={routesDictionary.login}
            isAuthenticated={false}
          />
          <Redirect to="/login" />
        </Switch>
      </div>
    </Router>
  );
};

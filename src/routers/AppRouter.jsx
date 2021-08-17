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

export const AppRouter = () => {
  return (
    <Router>
      <div>
        <GlobalSnackbar></GlobalSnackbar>
        <Switch>
          <PublicRoute
            component={LoginPage}
            layout={AuthLayout}
            path={routesDictionary.login}
            isAuthenticated={false}
          />
          <PublicRoute
            component={RegisterPage}
            layout={AuthLayout}
            path={routesDictionary.register}
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

          <Redirect to="/login" />
        </Switch>
      </div>
    </Router>
  );
};

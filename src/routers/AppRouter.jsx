import React from "react";
import { HashRouter as Router, Switch, Redirect } from "react-router-dom";
import { AuthLayout } from "../layouts/AuthLayout";
import { DashboardLayout } from "../layouts/DashboardLayout";
import { ConfigLayout } from "../layouts/ConfigLayout";
import LoginPage from "../pages/LoginPage";
import TestPage from "../pages/TestPage";
import { PublicRoute } from "./PublicRoute";
import routesDictionary from "./routesDict";

export const AppRouter = () => {
  return (
    <Router>
      <div>
        <Switch>
          <PublicRoute
            component={LoginPage}
            layout={AuthLayout}
            path={routesDictionary.login}
            isAuthenticated={false}
          />
          <PublicRoute
            component={TestPage}
            layout={DashboardLayout}
            path={routesDictionary.test}
            isAuthenticated={false}
          />
          <PublicRoute
            component={() => <p>Probando</p>}
            layout={DashboardLayout}
            path={routesDictionary.test1}
            isAuthenticated={false}
          />
          <Redirect to="/login" />
        </Switch>
      </div>
    </Router>
  );
};

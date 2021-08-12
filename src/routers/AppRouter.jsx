import React from "react";
import { HashRouter as Router, Switch, Redirect } from "react-router-dom";
import { AuthLayout } from "../layouts/AuthLayout";
import LoginPage from "../pages/LoginPage";
import TestPage from "../pages/TestPage";
import { PublicRoute } from "./PublicRoute";

export const AppRouter = () => {
  return (
    <Router>
      <div>
        <Switch>
          <PublicRoute
            component={LoginPage}
            layout={AuthLayout}
            path="/login"
            isAuthenticated={false}
          />
          <PublicRoute
            component={TestPage}
            layout={AuthLayout}
            path="/test"
            isAuthenticated={false}
          />
          <Redirect to="/login" />
        </Switch>
      </div>
    </Router>
  );
};

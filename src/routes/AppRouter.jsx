import React from "react";
import {
  HashRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { GlobalSnackbar } from "../components/GlobalSnackbar";
import { RENDER_ROUTES } from "./constants";
import AuthWrapper from "./AuthWrapper";
import RouterList from "./RouterList";
import { ROUTES_DICT } from "./routesDict";

export const AppRouter = () => {
  return (
    <Router>
      <div>
        <GlobalSnackbar />
        <AuthWrapper>
          <Switch>
            <Route
              path={ROUTES_DICT.root}
              exact
              render={() => <Redirect to={ROUTES_DICT.animal.list} />}
            ></Route>
            <RouterList routes={RENDER_ROUTES} outside={false} />
          </Switch>
          <RouterList routes={RENDER_ROUTES} outside={true} />
        </AuthWrapper>
      </div>
    </Router>
  );
};

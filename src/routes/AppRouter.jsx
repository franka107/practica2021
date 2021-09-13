import React from "react";
import { HashRouter as Router, Switch } from "react-router-dom";
import { GlobalSnackbar } from "../components/GlobalSnackbar";
import { RENDER_ROUTES } from "./constants";
import AuthWrapper from "./AuthWrapper";
import RouterList from "./RouterList";

const MemoizedRouterList = React.memo(({ routes, outside }) => (
  <RouterList routes={routes} outside={outside} />
));

export const AppRouter = () => {
  return (
    <Router>
      <div>
        <GlobalSnackbar />
        <AuthWrapper>
          <Switch>
            <MemoizedRouterList routes={RENDER_ROUTES} outside={false} />
          </Switch>
          <MemoizedRouterList routes={RENDER_ROUTES} outside={true} />
        </AuthWrapper>
      </div>
    </Router>
  );
};

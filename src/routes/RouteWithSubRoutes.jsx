import React from "react";
import { Route } from "react-router-dom";
import { AuthRoute } from "./AuthRoute";
import { ROUTE_TYPES } from "./constants";

function RouteWithSubRoutes({
  path,
  exact,
  routes,
  component: Component,
  layout: Layout,
  type,
}) {
  return (
    <AuthRoute
      path={path}
      layout={Layout}
      exact={exact}
      component={() => <Component routes={routes} />}
      isAuthenticated={false}
      type={type}
    />
  );
}

export default RouteWithSubRoutes;

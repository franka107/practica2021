import React from "react";
import { useSelector } from "react-redux";
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
  const { isLoggedIn } = useSelector((state) => state.auth);

  return (
    <AuthRoute
      path={path}
      layout={Layout}
      exact={exact}
      component={() => <Component routes={routes} />}
      isAuthenticated={isLoggedIn}
      type={type}
    />
  );
}

export default RouteWithSubRoutes;

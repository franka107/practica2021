import React from "react";
import PropTypes from "prop-types";

// eslint-disable-next-line no-unused-vars
import { Route, Redirect, RouteProps } from "react-router-dom";
import { ROUTE_TYPES } from "./constants";
import { ROUTES_DICT } from "./routesDict";

export const AuthRoute = ({
  isAuthenticated,
  component: Component,
  layout: Layout,
  type,
  ...rest
}) => {
  const handleRender = (props) => {
    switch (type) {
      case ROUTE_TYPES.public:
        return isAuthenticated ? (
          <Redirect to="/" />
        ) : (
          <Layout {...props}>
            <Component {...props} />
          </Layout>
        );
      case ROUTE_TYPES.private:
        return !isAuthenticated ? (
          <Redirect to={ROUTES_DICT.login} />
        ) : (
          <Layout {...props}>
            <Component {...props} />
          </Layout>
        );

      default:
    }
  };
  return <Route {...rest} render={handleRender} />;
};

AuthRoute.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  component: PropTypes.func.isRequired,
  layout: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
};

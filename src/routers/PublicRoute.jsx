import React from "react";
import PropTypes from "prop-types";

// eslint-disable-next-line no-unused-vars
import { Route, Redirect, RouteProps } from "react-router-dom";

export const PublicRoute = ({
  isAuthenticated,
  component: Component,
  layout: Layout,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? (
          <Redirect to="/" />
        ) : (
          <Layout {...props}>
            <Component {...props} />
          </Layout>
        )
      }
    />
  );
};

PublicRoute.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  component: PropTypes.func.isRequired,
  layout: PropTypes.func.isRequired,
};

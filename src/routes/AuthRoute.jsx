import React from "react";
import PropTypes from "prop-types";

// eslint-disable-next-line no-unused-vars
import { Route, Redirect, RouteProps } from "react-router-dom";
import { ROUTE_TYPES } from "./constants";
import { ROUTES_DICT } from "./routesDict";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { farmActions } from "../redux/actions/farm.actions";

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
            <Wrapper>
              <Component {...props} />
            </Wrapper>
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

const Wrapper = ({ children }) => {
  const dispatch = useDispatch();
  const { current: currentFarm } = useSelector((state) => state.farm);
  const { user } = useSelector((state) => state.auth);
  useEffect(() => {
    if (!currentFarm) {
      dispatch(farmActions.findFarmByOwnerId(user._id));
    }
  }, [dispatch, currentFarm, user]);
  return <>{children}</>;
};

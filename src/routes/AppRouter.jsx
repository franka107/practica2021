import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  HashRouter as Router,
  Route,
  Switch,
  useLocation,
  Redirect,
} from "react-router-dom";
import { GlobalSnackbar } from "../components/GlobalSnackbar";
import { farmActions } from "../redux/actions/farm.actions";
import { RENDER_ROUTES, ROUTE_TYPES } from "./constants";
import { ROUTES_DICT } from "./routesDict";
import PropTypes from "prop-types";

export const AppRouter = () => {
  return (
    <Router>
      <div>
        <GlobalSnackbar />
        <NestedSwitcher />
      </div>
    </Router>
  );
};

const NestedSwitcher = () => {
  return (
    <>
      <AuthWrapper>
        <Switch>
          <RouterList routes={RENDER_ROUTES} outside={false} />
        </Switch>
        <RouterList routes={RENDER_ROUTES} outside={true} />
      </AuthWrapper>
    </>
  );
};

/**
 *
 *
 * @component
 * @param {Array} routes - Array con rutas
 * @param {Boolean} outside - evalua logica para compatibilidad con Dialogs enrutados
 * @param {string} parentPathName - evalua logica para compatibilidad con Dialogs enrutados
 * @returns {Component}
 * @description Componente recursivo, renderiza una lista de rutas con hijos
 * @author Frank Cary Viveros <frank.cary@tecsup.edu.pe>
 */

const RouterList = ({ routes, outside, parentPathname }) => {
  const location = useLocation();
  const background = location.state && location.state.background;
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  return (
    <>
      {routes &&
        routes.map(
          ({
            path,
            exact,
            component: Component,
            layout: Layout,
            type,
            routes,
          }) => {
            if (!outside || (outside && background)) {
              return (
                <Route
                  path={path}
                  location={
                    !(outside && background) && (background || location)
                  }
                  exact={!(outside && background) && exact}
                  render={(routeProps) => {
                    if (
                      (type === ROUTE_TYPES.public && !isLoggedIn) ||
                      (type === ROUTE_TYPES.private && isLoggedIn)
                    ) {
                      return (
                        <>
                          {Layout ? (
                            <Layout>
                              <Component
                                parentPathname={parentPathname}
                                {...routeProps}
                              >
                                {routes && (
                                  <RouterList
                                    routes={routes}
                                    outside={outside}
                                    parentPathname={path}
                                  />
                                )}
                              </Component>
                            </Layout>
                          ) : (
                            <Component
                              parentPathname={parentPathname}
                              {...routeProps}
                            >
                              {routes && (
                                <RouterList
                                  routes={routes}
                                  parentPathname={path}
                                  outside={outside}
                                />
                              )}
                            </Component>
                          )}
                        </>
                      );
                    } else if (type === ROUTE_TYPES.public && isLoggedIn) {
                      return <Redirect to={ROUTES_DICT.animalControl} />;
                    } else if (type === ROUTE_TYPES.private && !isLoggedIn) {
                      return <Redirect to={ROUTES_DICT.login} />;
                    }
                  }}
                />
              );
            }
          }
        )}
    </>
  );
};

RouterList.propTypes = {
  routes: PropTypes.array,
  outside: PropTypes.bool,
  parentPathName: PropTypes.string,
};

/**
 *
 * @param {Array} children - Component hijo a renderizar
 * @returns {Component}
 * @description Wrapper de autentificacion que solicita datos globales de prioridad (Farm actual y Agronegocio actual)
 * @author Frank Cary Viveros <frank.cary@tecsup.edu.pe>
 */
const AuthWrapper = ({ children }) => {
  const dispatch = useDispatch();
  const currentFarm = useSelector((state) => state.farm.current);

  const currentAgribusiness = useSelector(
    (state) => state.agribusiness.current
  );

  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (!currentFarm) {
      dispatch(farmActions.findFarmByOwnerId(user?._id));
    }
  }, [dispatch, currentFarm, currentAgribusiness, user]);
  return <>{children}</>;
};

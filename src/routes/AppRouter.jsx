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

export const AppRouter = () => {
  return (
    <Router>
      <div>
        <GlobalSnackbar />
        {/* <RenderRoutes routes={ROUTES} /> */}
        <NestedSwitcher />
      </div>
    </Router>
  );
};

const NestedSwitcher = () => {
  return (
    <>
      <Switch>
        <RouterList routes={RENDER_ROUTES} />
      </Switch>
      <RouterList routes={RENDER_ROUTES} outside />
    </>
  );
};

/**
 *
 * @param {Array} routes - Array con rutas
 * @param {Boolean} outside - evalua logica para compatibilidad con Dialogs enrutados
 * @returns {Component}
 * @description Componente recursivo, renderiza una lista de rutas con hijos
 * @author Frank Cary Viveros <frank.cary@tecsup.edu.pe>
 */

const RouterList = ({ routes, outside }) => {
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
            parentPathname,
          }) => {
            if (outside) {
              return (
                background && (
                  <Route
                    path={path}
                    render={(routeProps) => (
                      <>
                        {Layout ? (
                          <Layout>
                            <Component
                              parentPathname={parentPathname}
                              {...routeProps}
                            >
                              {routes && <RouterList routes={routes} outside />}
                            </Component>
                          </Layout>
                        ) : (
                          <Component
                            parentPathname={parentPathname}
                            {...routeProps}
                          >
                            {routes && <RouterList routes={routes} outside />}
                          </Component>
                        )}
                      </>
                    )}
                  />
                )
              );
            } else {
              switch (type) {
                case ROUTE_TYPES.public:
                  return isLoggedIn ? (
                    <Redirect to={ROUTES_DICT.animalControl} />
                  ) : (
                    <Route
                      path={path}
                      location={background || location}
                      exact={exact}
                      render={(routeProps) => (
                        <>
                          {Layout ? (
                            <Layout>
                              <Component
                                parentPathname={parentPathname}
                                {...routeProps}
                              >
                                {routes && <RouterList routes={routes} />}
                              </Component>
                            </Layout>
                          ) : (
                            <Component
                              parentPathname={parentPathname}
                              {...routeProps}
                            >
                              {routes && <RouterList routes={routes} />}
                            </Component>
                          )}
                        </>
                      )}
                    />
                  );

                case ROUTE_TYPES.private:
                  return !isLoggedIn ? (
                    <Redirect to={ROUTES_DICT.login} />
                  ) : (
                    <AuthWrapper>
                      <Route
                        path={path}
                        location={background || location}
                        exact={exact}
                        render={(routeProps) => (
                          <>
                            {Layout ? (
                              <Layout>
                                <Component
                                  parentPathname={parentPathname}
                                  {...routeProps}
                                >
                                  {routes && <RouterList routes={routes} />}
                                </Component>
                              </Layout>
                            ) : (
                              <Component
                                parentPathname={parentPathname}
                                {...routeProps}
                              >
                                {routes && <RouterList routes={routes} />}
                              </Component>
                            )}
                          </>
                        )}
                      />
                    </AuthWrapper>
                  );
                default:
              }
            }
          }
        )}
    </>
  );
};

/**
 *
 * @param {Array} children - Component hijo a renderizar
 * @returns {Component}
 * @description Wrapper de autentificacion que solicita datos globales de prioridad
 * @author Frank Cary Viveros <frank.cary@tecsup.edu.pe>
 */
const AuthWrapper = ({ children }) => {
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

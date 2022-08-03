import { useSelector } from "react-redux";
import { Route, useLocation, Redirect } from "react-router-dom";
import { ROUTE_TYPES } from "./constants";
import PropTypes from "prop-types";
import { ROUTES_DICT } from "./routesDict";
import React from "react";

/**
 * @component
 * @description Componente recursivo, renderiza una lista de rutas con hijos
 * @author Frank Cary Viveros <frank.cary@tecsup.edu.pe>
 */

const RouterList = ({ routes, outside, parentPathname, ...parentProps }) => {
  const location = useLocation();
  const background = location.state && location.state.background;
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  return (
    <>
      {routes &&
        routes.map(
          (
            {
              path,
              exact,
              component: Component,
              layout: Layout,
              type,
              routes,
              // eslint-disable-next-line array-callback-return
            },
            index
          ) => {
            if (!outside || (outside && background)) {
              return (
                <MemoizedRoute
                  key={index}
                  path={path}
                  outside={outside}
                  background={background}
                  location={location}
                  exact={exact}
                  isLoggedIn={isLoggedIn}
                  parentProps={parentProps}
                  type={type}
                  layout={Layout}
                  component={Component}
                  parentPathname={parentPathname}
                  routes={routes}
                />
              );
            }
            return null;
          }
        )}
    </>
  );
};

RouterList.propTypes = {
  /**
   * Array con rutas
   */
  routes: PropTypes.array,
  /**
   * Evalua logica para compatibilidad con Dialogs enrutados
   */
  outside: PropTypes.bool,
  /**
   * String pathname del padre, es recibido como propiedad por todos los componentes hijos
   */
  parentPathName: PropTypes.string,
};

const MemoizedRoute = React.memo(
  ({
    path,
    outside,
    background,
    location,
    exact,
    isLoggedIn,
    parentProps,
    type,
    layout: Layout,
    component: Component,
    parentPathname,
    routes,
  }) => (
    <Route
      path={path}
      location={!(outside && background) && (background || location)}
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
                    {...parentProps}
                  >
                    {(childProps) =>
                      routes && (
                        <RouterList
                          routes={routes}
                          outside={outside}
                          parentPathname={path}
                          {...childProps}
                        />
                      )
                    }
                  </Component>
                </Layout>
              ) : (
                <Component
                  parentPathname={parentPathname}
                  {...routeProps}
                  {...parentProps}
                >
                  {(childProps) =>
                    routes && (
                      <RouterList
                        routes={routes}
                        parentPathname={path}
                        outside={outside}
                        {...childProps}
                      />
                    )
                  }
                </Component>
              )}
            </>
          );
        } else if (type === ROUTE_TYPES.public && isLoggedIn) {
          return <Redirect to={ROUTES_DICT.graphics} />;
        } else if (type === ROUTE_TYPES.private && !isLoggedIn) {
          return <Redirect to={ROUTES_DICT.login} />;
        }
      }}
    />
  ),
  (prevProps, nextProps) => false
);
export default RouterList;

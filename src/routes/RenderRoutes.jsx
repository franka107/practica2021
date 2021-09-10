import {
  Switch,
  Route,
  useLocation,
  matchPath,
  useRouteMatch,
} from "react-router-dom";
import RouteWithSubRoutes from "./RouteWithSubRoutes";
import { ROUTES_DICT } from "./routesDict";
import MovementCreatePage from "../pages/GeneticStock/MovementCreatePage";
import { Dialog } from "@material-ui/core";

/**
 * Use this component for any new section of routes (any config object that has a "routes" property
 */
export function RenderRoutes({ routes }) {
  let location = useLocation();
  let background = location.state && location.state.background;
  //console.log("location =>", location);
  console.log("background =>", background);
  console.log("location =>", location);

  return (
    <div>
      <Switch location={background || location}>
        {routes.map((route) => {
          return (
            route.exact && <RouteWithSubRoutes key={route.key} {...route} />
          );
        })}
        {routes.map((route) => {
          return (
            !route.exact && <RouteWithSubRoutes key={route.key} {...route} />
          );
        })}
      </Switch>
      {routes.map(({ component: Component, ...route }) => {
        if (route.parent) {
          return (
            background && <Route key={route.key} children={<Component />} />
          );
        }
      })}
      {/* 
      {routes.map((route) => {
        return background && <RouteWithSubRoutes key={route.key} {...route} />;
      })}
    */}
      {/* 
      {routes.map((route) => {
        return background && <RouteWithSubRoutes key={route.key} {...route} />;
      })}
      */}
      {/* 
      {background && (
        <Route
          path={ROUTES_DICT.movementsCreate}
          children={<Dialog open>Probando</Dialog>}
        />
      )}
      */}
    </div>
  );
}

const TestComponent = () => {
  const routeMatch = useRouteMatch();
  console.log("routeMatch testcompoent => ", routeMatch);
  return <h1>Test component</h1>;
};

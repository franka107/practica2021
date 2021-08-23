import { Switch } from "react-router-dom";
import RouteWithSubRoutes from "./RouteWithSubRoutes";

/**
 * Use this component for any new section of routes (any config object that has a "routes" property
 */
export function RenderRoutes({ routes }) {
  return (
    <Switch>
      {routes.map((route) => {
        return <RouteWithSubRoutes key={route.key} {...route} />;
      })}
    </Switch>
  );
}

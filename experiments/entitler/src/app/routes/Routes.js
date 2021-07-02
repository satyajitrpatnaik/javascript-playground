import { Route, Switch } from "react-router-dom";
import NAV_LINKS from "app/utils/constants/navlinks";

const Routes = () => {
  return (
    <Switch>
      {NAV_LINKS.map((link) => {
        let routes = [];
        if (link?.children && link.children.length) {
          routes = link.children.map((child) => (
            <Route key={child.id} path={child.path} exact>
              {child.component}
            </Route>
          ));
        }
        routes.push(
          <Route key={link.id} path={link.path} exact>
            {link.component}
          </Route>
        );
        return routes;
      })}
    </Switch>
  );
};

export default Routes;

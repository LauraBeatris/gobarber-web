import React from "react";
import { Switch } from "react-router-dom";

import NotFound from "pages/NotFound";

import Route from "./CustomRoute";
import appRoutes from "./appRoutes";

const Router: React.FC = () => (
  <Switch>
    {
      appRoutes.map(route => (
        <Route
          key={route.path}
          path={route.path}
          exact={route.exact}
          component={route.component}
          isPrivate={route.isPrivate}
        />
      ))
    }

    <Route
      path="*"
      component={NotFound}
    />
  </Switch>
);

export default Router;

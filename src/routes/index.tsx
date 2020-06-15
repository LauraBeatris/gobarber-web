import React from "react";
import { Switch } from "react-router-dom";

import Dashboard from "../pages/Dashboard";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import Route from "./CustomRoute";
import {
  DASHBOARD_PAGE_PATH,
  SIGNIN_PAGE_PATH,
  SIGNUP_PAGE_PATH,
} from "../constants/routesPaths";

const Router: React.FC = () => (
  <Switch>
    <Route
      path={DASHBOARD_PAGE_PATH}
      exact
      component={Dashboard}
      isPrivate
    />
    <Route
      path={SIGNIN_PAGE_PATH}
      component={SignIn}
    />
    <Route
      path={SIGNUP_PAGE_PATH}
      component={SignUp}
    />
  </Switch>
);

export default Router;

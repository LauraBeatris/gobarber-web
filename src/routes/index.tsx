import React from "react";
import { Switch, Route as ReactRouterRoute } from "react-router-dom";

import SignIn from "pages/SignIn";
import SignUp from "pages/SignUp";
import Profile from "pages/Profile";
import Dashboard from "pages/Dashboard/DashboardContainer";
import ForgotPassword from "pages/ForgotPassword";
import ResetPassword from "pages/ResetPassword";
import RequestPasswordResetSuccess from "pages/RequestPasswordResetSuccess";
import {
  PROFILE_PAGE_PATH,
  SIGN_IN_PAGE_PATH,
  SIGN_UP_PAGE_PATH,
  DASHBOARD_PAGE_PATH,
  RESET_PASSWORD_PATH,
  FORGOT_PASSWORD_PATH,
  REQUEST_PASSWORD_REQUEST_SUCCESS,
} from "constants/routesPaths";
import AppLayout from "layouts/App";

import Route from "./CustomRoute";

const Router: React.FC = () => (
  <Switch>
    <Route
      path={SIGN_IN_PAGE_PATH}
      component={SignIn}
    />

    <Route
      exact
      path={SIGN_UP_PAGE_PATH}
      component={SignUp}
    />

    <Route
      path={RESET_PASSWORD_PATH}
      component={ResetPassword}
    />

    <Route
      path={REQUEST_PASSWORD_REQUEST_SUCCESS}
      component={RequestPasswordResetSuccess}
    />

    <Route
      path={FORGOT_PASSWORD_PATH}
      component={ForgotPassword}
    />

    <ReactRouterRoute>
      <AppLayout>
        <Switch>
          <Route
            path={PROFILE_PAGE_PATH}
            component={Profile}
            isPrivate
          />

          <Route
            path={DASHBOARD_PAGE_PATH}
            exact
            component={Dashboard}
            isPrivate
          />
        </Switch>
      </AppLayout>
    </ReactRouterRoute>
  </Switch>
);

export default Router;

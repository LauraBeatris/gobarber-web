import React from "react";
import {
  Route, Redirect, RouteProps, useLocation,
} from "react-router-dom";

import { useAuthState } from "contexts/auth/AuthContext";
import { SIGN_IN_PAGE_PATH, DASHBOARD_PAGE_PATH } from "constants/routesPaths";

interface CustomRouteProps extends RouteProps {
  isPrivate?: boolean;
  component: React.ComponentType;
}

const CustomRoute: React.FC<CustomRouteProps> = ({
  isPrivate = false,
  component: Component,
  ...rest
}) => {
  const location = useLocation();
  const { token } = useAuthState();

  return (
    <Route
      {...rest}
      render={() => (
        (!!token === isPrivate
          ? (
            <Component />
          )
          : (
            <Redirect
              to={{
                pathname: isPrivate
                  ? SIGN_IN_PAGE_PATH
                  : DASHBOARD_PAGE_PATH,
                state: { from: location },
              }}
            />
          )
        )
      )}
    />
  );
};

export default CustomRoute;

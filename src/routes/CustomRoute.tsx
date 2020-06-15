import React from "react";
import {
  Route, Redirect, RouteProps, useLocation,
} from "react-router-dom";

import { useAuthState } from "../contexts/auth/AuthContext";
import {
  SIGNIN_PAGE_PATH,
  DASHBOARD_PAGE_PATH,
} from "../constants/routesPaths";

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
  const { user: isSigned } = useAuthState();

  return (
    <Route
      {...rest}
      render={() => (
        (!!isSigned === isPrivate
          ? (
            <Component />
          )
          : (
            <Redirect
              to={{
                pathname: isPrivate
                  ? SIGNIN_PAGE_PATH
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

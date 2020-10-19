import {
  REQUEST_PASSWORD_REQUEST_SUCCESS,
  FORGOT_PASSWORD_PATH,
  RESET_PASSWORD_PATH,
  DASHBOARD_PAGE_PATH,
  SIGN_IN_PAGE_PATH,
  SIGN_UP_PAGE_PATH,
  PROFILE_PAGE_PATH,
} from "constants/routesPaths";
import DashboardContainer from "pages/Dashboard/DashboardContainer";
import ForgotPassword from "pages/ForgotPassword";
import Profile from "pages/Profile";
import RequestPasswordResetSuccess from "pages/RequestPasswordResetSuccess";
import ResetPassword from "pages/ResetPassword";
import SignIn from "pages/SignIn";
import SignUp from "pages/SignUp";

const defaultRouteConfig = {
  isPrivate: false,
  exact: true,
};

const appRoutes = [
  {
    ...defaultRouteConfig,
    path: SIGN_IN_PAGE_PATH,
    component: SignIn,
  },
  {
    ...defaultRouteConfig,
    path: SIGN_UP_PAGE_PATH,
    component: SignUp,
  },
  {
    ...defaultRouteConfig,
    path: RESET_PASSWORD_PATH,
    component: ResetPassword,
  },
  {
    ...defaultRouteConfig,
    path: REQUEST_PASSWORD_REQUEST_SUCCESS,
    component: RequestPasswordResetSuccess,
  },
  {
    ...defaultRouteConfig,
    path: FORGOT_PASSWORD_PATH,
    component: ForgotPassword,
  },
  {
    ...defaultRouteConfig,
    path: DASHBOARD_PAGE_PATH,
    isPrivate: true,
    component: DashboardContainer,
  },
  {
    ...defaultRouteConfig,
    path: PROFILE_PAGE_PATH,
    isPrivate: true,
    component: Profile,
  },
];

export default appRoutes;

import React from "react";
import { Switch, Redirect, Route } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import Login from "../components/Auth/login";
import Home from "../components/Home";
import PrivateRoute from "./private.route";
import {
  getHomeRoute,
  LOGIN_BASE_ROUTE,
  HOME_BASE_ROUTE,
  SIGN_UP_BASE_ROUTE
} from "./routes";
import { getStoredUserAuth } from "../modules/Auth/auth";
import { history } from "../modules/Store";
import SignUp from "../components/Auth/signUp";

function redirectLogin() {
  if (getStoredUserAuth()) {
    return <Redirect to={getHomeRoute()} />;
  }
  return <Login />;
}

function redirectSignUp() {
  if (getStoredUserAuth()) {
    return <Redirect to={getHomeRoute()} />;
  }
  return <SignUp />;
}

export const AppRouter: React.FC = () => {
  return (
    <ConnectedRouter history={history}>
      <Switch>
        <PrivateRoute exact path="/" component={Home} />
        <PrivateRoute path={HOME_BASE_ROUTE} component={Home} />
        <Route path={LOGIN_BASE_ROUTE} component={redirectLogin} />
        <Route path={SIGN_UP_BASE_ROUTE} component={redirectSignUp} />
      </Switch>
    </ConnectedRouter>
  );
};

export default AppRouter;

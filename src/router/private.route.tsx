import React, { useEffect } from "react";
import { Route, Redirect, RouteComponentProps } from "react-router-dom";
import { getLoginRoute } from "./routes";
import { getStoredUserAuth } from "../modules/Auth/auth";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { IAppState } from "../modules/App/app.types";
import { meAction } from "../modules/User/user.actions";

interface IPrivateRouteProps {
  path?: string | string[];
  component:
    | React.ComponentType<RouteComponentProps<any>>
    | React.ComponentType<any>;
  exact?: boolean;
  render?: (props: RouteComponentProps<any>) => React.ReactNode;
}

const PrivateRoute: React.FC<IPrivateRouteProps> = ({
  component: Component,
  path,
  exact,
  render
}) => {
  const auth = getStoredUserAuth();

  const user = useSelector((state: IAppState) => state.user, shallowEqual);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(meAction.started(undefined));
  }, [dispatch]);

  /**
   * This will render the component when the user data has finished loading, you can replace the "meAction" with
   * any other secure way to validate the user token/cookie... If an error occurs when validating user authentication,
   * a redirection is returned.
   * @param renderProps
   */
  function validateAuth(renderProps: RouteComponentProps<any>) {
    if (
      !auth ||
      (user.userData && user.userData.id !== auth.userId) ||
      user.error.me
    ) {
      if (auth) {
        window.localStorage.clear();
      }
      return <Redirect to={getLoginRoute()} />;
    } else if (user.userData) {
      if (render) {
        const res = render(renderProps);
        if (res) {
          return res;
        }
      }

      return <Component {...renderProps} />;
    }

    return <div>LOADING...</div>; // Loading screen
  }

  return <Route path={path} exact={exact} render={validateAuth} />;
};

export default PrivateRoute;

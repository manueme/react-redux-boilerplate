import { IAppState } from "./app.types";
import { combineReducers, Reducer } from "redux";
import { History } from "history";
import { connectRouter, RouterState } from "connected-react-router";
import authReducer, { AUTH_STORE_INITIAL_STATE } from "../Auth/auth.reducer";
import userReducer, { USER_STORE_INITIAL_STATE } from "../User/user.reducer";
import postReducer, { POST_STORE_INITIAL_STATE } from "../Post/post.reducer";
import { AppAction, logoutAction } from "./app.actions";

export const ROUTER_STORE_INITIAL_STATE: RouterState = {
  location: {
    hash: "",
    pathname: "",
    search: "",
    state: null
  },
  action: "PUSH"
};

export const APP_STORE_INITIAL_STATE: IAppState = {
  auth: AUTH_STORE_INITIAL_STATE,
  user: USER_STORE_INITIAL_STATE,
  router: ROUTER_STORE_INITIAL_STATE,
  post: POST_STORE_INITIAL_STATE
};

const appReducer = (
  rootReducer: Reducer<IAppState, AppAction>
): Reducer<IAppState, AppAction> => (
  state: IAppState | undefined,
  action: AppAction
) => {
  if (state) {
    switch (action.type) {
      case logoutAction.started.type: {
        window.localStorage.clear();
        return rootReducer(APP_STORE_INITIAL_STATE, logoutAction.done({}));
      }
      default:
        return rootReducer(state, action);
    }
  }
  return rootReducer(state, action);
};

export const createRootReducer = (history: History) =>
  appReducer(
    combineReducers({
      auth: authReducer,
      router: connectRouter(history),
      user: userReducer,
      post: postReducer
    })
  );

export default createRootReducer;

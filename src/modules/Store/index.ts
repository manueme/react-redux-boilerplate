import { createBrowserHistory } from "history";
import { routerMiddleware } from "connected-react-router";
import {
  applyMiddleware,
  createStore as configureStore,
  Middleware
} from "redux";
import logger from "redux-logger";
import { createEpicMiddleware } from "redux-observable";
import { ajax } from "rxjs/ajax";
import epic from "modules/App/app.epic";
import createRootReducer from "modules/App/app.reducer";
import { IAppState, IEpicDependencies } from "../App/app.types";
import { AppAction } from "../App/app.actions";

export const history = createBrowserHistory();

const epicMiddleware = createEpicMiddleware<
  AppAction,
  AppAction,
  IAppState,
  IEpicDependencies
>({ dependencies: { ajax } });

const middleware: Middleware[] = [epicMiddleware, routerMiddleware(history)];

if (process.env.NODE_ENV === "development") {
  middleware.unshift(logger);
}

const createStore = (initialState?: IAppState) => {
  const store = configureStore(
    createRootReducer(history),
    initialState!,
    applyMiddleware(...middleware)
  );
  epicMiddleware.run(epic);
  return store;
};

export default createStore;

import { combineEpics, Epic } from "redux-observable";
import { mergeMap, catchError, filter } from "rxjs/operators";
import {logIn, signUp} from "./auth";
import { loginAction, signUpAction } from "./auth.actions";
import { of } from "rxjs";
import { AppAction } from "../App/app.actions";
import {IApiError, IAppState, IEpicDependencies} from "../App/app.types";

export const loginEpic: Epic<
  AppAction,
  AppAction,
  IAppState,
  IEpicDependencies
> = action$ =>
  action$.pipe(
    filter(loginAction.started.match),
    mergeMap(({ payload: params }) =>
      logIn(params.email, params.password).pipe(
        mergeMap(result => of(loginAction.done({ params, result }))),
        catchError(error => of(loginAction.failed({ params, error })))
      )
    )
  );

export const signUpEpic: Epic<
  AppAction,
  AppAction,
  IAppState,
  IEpicDependencies
> = action$ =>
  action$.pipe(
    filter(signUpAction.started.match),
    mergeMap(({ payload: params }) =>
      signUp(params).pipe(
        mergeMap(result => of(signUpAction.done({ params, result }))),
        catchError((error: IApiError) => {
          return of(signUpAction.failed({ params, error }));
        })
      )
    )
  );

export default combineEpics(loginEpic, signUpEpic);

import { combineEpics, Epic } from "redux-observable";
import { mergeMap, catchError, filter } from "rxjs/operators";
import { me } from "./user";
import { meAction } from "./user.actions";
import { of } from "rxjs";
import { AppAction } from "../App/app.actions";
import { IAppState, IEpicDependencies } from "../App/app.types";

export const meEpic: Epic<
  AppAction,
  AppAction,
  IAppState,
  IEpicDependencies
> = action$ =>
  action$.pipe(
    filter(meAction.started.match),
    mergeMap(({ payload: params }) =>
      me().pipe(
        mergeMap(result => of(meAction.done({ params, result }))),
        catchError(error => of(meAction.failed({ params, error })))
      )
    )
  );

export default combineEpics(meEpic);

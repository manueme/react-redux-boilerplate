import { combineEpics, Epic } from "redux-observable";
import { mergeMap, catchError, filter } from "rxjs/operators";
import { fetchPosts } from "./post";
import { getPostsAction } from "./post.actions";
import { of } from "rxjs";
import { AppAction } from "../App/app.actions";
import { IAppState, IEpicDependencies } from "../App/app.types";

export const getPostsEpic: Epic<
  AppAction,
  AppAction,
  IAppState,
  IEpicDependencies
> = action$ =>
  action$.pipe(
    filter(getPostsAction.started.match),
    mergeMap(({ payload: params }) =>
      fetchPosts(params.userId).pipe(
        mergeMap(result => of(getPostsAction.done({ params, result }))),
        catchError(error => of(getPostsAction.failed({ params, error })))
      )
    )
  );

export default combineEpics(getPostsEpic);

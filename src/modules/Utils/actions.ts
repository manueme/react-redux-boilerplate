import { AppAction } from "../App/app.actions";
import { ActionCreator, AsyncActionCreators } from "typescript-fsa";
import { IApiError } from "../App/app.types";

export function actionIs<T>(
  action: AppAction,
  actionCreator: ActionCreator<T>
): action is ReturnType<ActionCreator<T>> {
  return action.type === actionCreator.type;
}

export interface IProcessSimpleActionResult<T> {
  error: boolean;
  fetching: boolean;
  apiError?: IApiError;
  payload?: T;
}

export function processStandarAction<P, R>(
  action: AppAction,
  actionCreator: AsyncActionCreators<P, R, IApiError>
): IProcessSimpleActionResult<R> | undefined {
  if (actionIs(action, actionCreator.started)) {
    return {
      fetching: true,
      error: false,
      apiError: undefined,
      payload: undefined
    };
  }
  if (actionIs(action, actionCreator.failed)) {
    return {
      fetching: false,
      error: true,
      apiError: action.payload.error,
      payload: undefined
    };
  }
  if (
    actionIs(action, actionCreator.done as ActionCreator<
      { params: P } & { result: R }
    >)
  ) {
    return {
      fetching: false,
      error: false,
      apiError: undefined,
      payload: action.payload.result
    };
  }
}

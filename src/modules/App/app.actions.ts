import { AuthAction } from "../Auth/auth.actions";
import actionCreatorFactory from "typescript-fsa";
import { IApiError } from "./app.types";
import { MeAction } from "../User/user.actions";
import { RouterAction } from "connected-react-router";
import { PostAction } from "../Post/post.actions";

export const logoutAction = actionCreatorFactory().async<
  undefined,
  undefined,
  IApiError
>("LOGOUT_ACTION");

export type AppAction =
  | PostAction
  | RouterAction
  | MeAction
  | AuthAction
  | ReturnType<typeof logoutAction.started>
  | ReturnType<typeof logoutAction.done>
  | ReturnType<typeof logoutAction.failed>;

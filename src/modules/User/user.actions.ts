import { IUser } from "./user.types";
import { IApiError } from "../App/app.types";
import actionCreatorFactory from "typescript-fsa";

export const meAction = actionCreatorFactory().async<
  undefined,
  IUser | undefined,
  IApiError
>("ME_ACTION");

export type MeAction =
  | ReturnType<typeof meAction.started>
  | ReturnType<typeof meAction.done>
  | ReturnType<typeof meAction.failed>;

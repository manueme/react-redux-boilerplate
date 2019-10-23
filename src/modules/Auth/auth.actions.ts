import { ILoginResult } from "./auth.types";
import { IApiError } from "../App/app.types";
import actionCreatorFactory from "typescript-fsa";

export interface ILoginActionInput {
  email: string;
  password: string;
}

export interface ISignUpActionInput {
  name: string;
  username: string;
  email: string;
  password: string;
  repeatPassword: string;
}

export const signUpAction = actionCreatorFactory().async<
  ISignUpActionInput,
  ILoginResult,
  IApiError
>("SIGN_UP_ACTION");

export const loginAction = actionCreatorFactory().async<
  ILoginActionInput,
  ILoginResult,
  IApiError
  >("LOGIN_ACTION");

export type AuthAction =
  | ReturnType<typeof loginAction.started>
  | ReturnType<typeof loginAction.done>
  | ReturnType<typeof loginAction.failed>
  | ReturnType<typeof signUpAction.started>
  | ReturnType<typeof signUpAction.done>
  | ReturnType<typeof signUpAction.failed>;

import { IAuthState } from "../Auth/auth.types";
import { AjaxCreationMethod } from "rxjs/internal-compatibility";
import { IUserState } from "../User/user.types";
import { RouterState } from "connected-react-router";

export interface IAppState {
  router: RouterState;
  auth: IAuthState;
  user: IUserState;
}

export interface IApiError {
  errorMessage: string;
}

export interface IEpicDependencies {
  ajax: AjaxCreationMethod;
}

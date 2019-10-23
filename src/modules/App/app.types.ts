import { IAuthState } from "../Auth/auth.types";
import { AjaxCreationMethod } from "rxjs/internal-compatibility";
import { IUserState } from "../User/user.types";
import { RouterState } from "connected-react-router";
import {IPostState} from "../Post/post.types";

export interface IAppState {
  router: RouterState;
  auth: IAuthState;
  user: IUserState;
  post: IPostState;
}

export interface IApiError {
  errorMessage: string;
}

export interface IEpicDependencies {
  ajax: AjaxCreationMethod;
}

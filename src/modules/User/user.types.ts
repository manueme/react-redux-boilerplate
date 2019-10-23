import { IApiError } from "../App/app.types";

export interface IUser {
  id: number;
  name: string;
  username: string;
  email: string;
}

interface IActionFlags {
  me: boolean; // one flag per action
}

export interface IUserState {
  userData: IUser | undefined;
  apiError: IApiError | undefined;
  error: IActionFlags;
  fetching: IActionFlags;
}

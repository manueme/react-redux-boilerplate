import {IApiError} from "../App/app.types";

export interface ILoginResult {
    userId: number;
}

interface IActionFlags {
    login: boolean,
    signUp: boolean
}

export interface IAuthState {
    authData: ILoginResult | undefined,
    apiError: IApiError | undefined
    error: IActionFlags
    fetching: IActionFlags
}

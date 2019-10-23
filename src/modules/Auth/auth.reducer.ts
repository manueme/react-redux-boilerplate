import { IAuthState } from "./auth.types";
import {AuthAction, loginAction, signUpAction} from "./auth.actions";
import { processStandarAction } from "../Utils/actions";

export const AUTH_STORE_INITIAL_STATE: IAuthState = {
  authData: undefined,
  apiError: undefined,
  error: {
    login: false,
    signUp: false
  },
  fetching: {
    login: false,
    signUp: false
  }
};

export default function authReducer(
  state = AUTH_STORE_INITIAL_STATE,
  action: AuthAction
): IAuthState {
  const loginResult = processStandarAction(action, loginAction);
  if (loginResult) {
    state.error.login = loginResult.error;
    state.fetching.login = loginResult.fetching;
    state.apiError = loginResult.apiError || state.apiError;
    state.authData = loginResult.payload || state.authData;
    return state;
  }
  const signupResult = processStandarAction(action, signUpAction);
  if (signupResult) {
    state.error.signUp = signupResult.error;
    state.fetching.signUp = signupResult.fetching;
    state.apiError = signupResult.apiError || state.apiError;
    state.authData = signupResult.payload || state.authData;
    return state;
  }

  return state;
}

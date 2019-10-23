import { IAuthState } from "./auth.types";
import { AuthAction, loginAction, signUpAction } from "./auth.actions";
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
    return {
      ...state,
      error: {
        ...state.error,
        login: loginResult.error
      },
      fetching: {
        ...state.fetching,
        login: loginResult.fetching
      },
      apiError: loginResult.apiError || state.apiError,
      authData: loginResult.payload || state.authData
    };
  }
  const signupResult = processStandarAction(action, signUpAction);
  if (signupResult) {
    return {
      ...state,
      error: {
        ...state.error,
        signUp: signupResult.error
      },
      fetching: {
        ...state.fetching,
        signUp: signupResult.fetching
      },
      apiError: signupResult.apiError || state.apiError,
      authData: signupResult.payload || state.authData
    };
  }

  return state;
}

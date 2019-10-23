import { IUserState } from "./user.types";
import { MeAction, meAction } from "./user.actions";
import { processStandarAction } from "../Utils/actions";

export const USER_STORE_INITIAL_STATE: IUserState = {
  userData: undefined,
  apiError: undefined,
  error: {
    me: false
  },
  fetching: {
    me: false
  }
};

export default function userReducer(
  state = USER_STORE_INITIAL_STATE,
  action: MeAction
): IUserState {
  const meResult = processStandarAction(action, meAction);
  if (meResult) {
    state.error.me = meResult.error;
    state.fetching.me = meResult.fetching;
    state.apiError = meResult.apiError || state.apiError;
    state.userData = meResult.payload || state.userData;
    return state;
  }

  return state;
}

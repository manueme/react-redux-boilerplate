import { IUserState } from "./user.types";
import { MeAction, meAction } from "./user.actions";
import { processStandardAction } from "../Utils/actions";

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
  const meResult = processStandardAction(action, meAction);
  if (meResult) {
    return {
      ...state,
      error: {
        ...state.error,
        me: meResult.error
      },
      fetching: {
        ...state.fetching,
        me: meResult.fetching
      },
      apiError: meResult.apiError || state.apiError,
      userData: meResult.payload || state.userData
    };
  }

  return state;
}

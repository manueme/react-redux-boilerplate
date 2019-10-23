import { ILoginResult } from "./auth.types";
import { Observable, of } from "rxjs";
import { ISignUpActionInput } from "./auth.actions";

export const logIn = (
  email: string,
  password: string
): Observable<ILoginResult> => {
  // This should be a POST with a body with the email and password
  const response: ILoginResult = { userId: 1 }; // Maybe set a token here
  setAuthStatus(response);
  return of(response);
};

export const signUp = (
  formData: ISignUpActionInput
): Observable<ILoginResult> => {
  const response: ILoginResult = { userId: 1 }; // Maybe set a token here
  setAuthStatus(response);
  return of(response);
};

const setAuthStatus = (userAuth: ILoginResult) => {
  window.localStorage.setItem("UserAuth", JSON.stringify(userAuth));
};

export const getStoredUserAuth = (): ILoginResult | undefined => {
  const auth = window.localStorage.getItem("UserAuth");
  if (auth) {
    return JSON.parse(auth);
  }
};

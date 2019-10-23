import { IUser } from "./user.types";
import config from "../../config";
import { Observable, of, throwError } from "rxjs";
import { ajax } from "rxjs/ajax";
import { catchError, map } from "rxjs/operators";
import { getStoredUserAuth } from "../Auth/auth";

export const me = (): Observable<IUser | undefined> => {
  const auth = getStoredUserAuth();
  // This is typically an endpoint that returns the user data of the current logged user, something like .../api/users/me
  if (auth) {
    return ajax({
      url: `${config.API_URL}/users/${auth.userId}`,
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
      crossDomain: true
    }).pipe(
      map(payload => {
        if (payload.status === 200) {
          const response: IUser = payload.response;
          return response;
        }
        throw Error();
      }),
      catchError(response => throwError(response))
    );
  }
  return of(undefined);
};

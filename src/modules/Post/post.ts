import { IPost } from "./post.types";
import config from "../../config";
import { Observable, of, throwError } from "rxjs";
import { ajax } from "rxjs/ajax";
import { catchError, map } from "rxjs/operators";
import { getStoredUserAuth } from "../Auth/auth";

export const fetchPosts = (
  userId?: number
): Observable<IPost[] | undefined> => {
  const auth = getStoredUserAuth();
  if (auth) {
    return ajax({
      url: `${config.API_URL}/posts${userId ? `?userId=${userId}` : ""}`,
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    }).pipe(
      map(payload => {
        if (payload.status === 200) {
          const response: IPost[] = payload.response;
          return response;
        }
        throw Error();
      }),
      catchError(response => throwError(response))
    );
  }
  return of(undefined);
};

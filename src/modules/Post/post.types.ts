import { IApiError } from "../App/app.types";

export interface IPost {
  userId: number;
  id: number;
  title: string;
  body: string;
}

interface IActionFlags {
  getPosts: boolean;
}

export interface IPostState {
  postData: IPost[] | undefined;
  apiError: IApiError | undefined;
  error: IActionFlags;
  fetching: IActionFlags;
}

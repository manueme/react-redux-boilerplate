import { IPost } from "./post.types";
import { IApiError } from "../App/app.types";
import actionCreatorFactory from "typescript-fsa";

interface IGetPostsActionPayload {
  userId?: number;
}

export const getPostsAction = actionCreatorFactory().async<
  IGetPostsActionPayload,
  IPost[] | undefined,
  IApiError
>("GET_POSTS_ACTION");

export type PostAction =
  | ReturnType<typeof getPostsAction.started>
  | ReturnType<typeof getPostsAction.done>
  | ReturnType<typeof getPostsAction.failed>;

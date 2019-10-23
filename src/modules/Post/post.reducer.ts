import { IPostState } from "./post.types";
import { PostAction, getPostsAction } from "./post.actions";
import { processStandarAction } from "../Utils/actions";

export const POST_STORE_INITIAL_STATE: IPostState = {
  postData: undefined,
  apiError: undefined,
  error: {
    getPosts: false
  },
  fetching: {
    getPosts: false
  }
};

export default function postReducer(
  state = POST_STORE_INITIAL_STATE,
  action: PostAction
): IPostState {
  const getPostsResult = processStandarAction(action, getPostsAction);
  if (getPostsResult) {
    state.error.getPosts = getPostsResult.error;
    state.fetching.getPosts = getPostsResult.fetching;
    state.apiError = getPostsResult.apiError || state.apiError;
    state.postData = getPostsResult.payload || state.postData;
    return state;
  }

  return state;
}

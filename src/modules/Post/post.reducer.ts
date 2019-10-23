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
    return {
      ...state,
      error: {
        ...state.error,
        getPosts: getPostsResult.error
      },
      fetching: {
        ...state.fetching,
        getPosts: getPostsResult.fetching
      },
      apiError: getPostsResult.apiError || state.apiError,
      postData: getPostsResult.payload || state.postData
    };
  }

  return state;
}

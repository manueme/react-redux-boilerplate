import { combineEpics } from "redux-observable";
import authEpic from "modules/Auth/auth.epic";
import userEpic from "modules/User/user.epic";
import postEpic from "modules/Post/post.epic";
import { AppAction } from "./app.actions";
import { IAppState, IEpicDependencies } from "./app.types";

export default combineEpics<AppAction, AppAction, IAppState, IEpicDependencies>(
  authEpic,
  userEpic,
  postEpic
);

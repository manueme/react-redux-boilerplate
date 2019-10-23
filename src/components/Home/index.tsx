import React, { useEffect, useState } from "react";
import styles from "./scss/home.module.scss";
import { Button } from "../Form/button";
import { useDispatch, useSelector } from "react-redux";
import { logoutAction } from "../../modules/App/app.actions";
import { IAppState } from "../../modules/App/app.types";
import { getPostsAction } from "../../modules/Post/post.actions";
import TextInput from "../Form/textInput";

export const Home: React.FC = () => {
  const dispatch = useDispatch();
  const [filter, setFilter] = useState("");
  const { user, post } = useSelector(
    (state: IAppState) => {
      return {
        user: state.user,
        post: state.post
      };
    },
    (left, right) =>
      left.user.userData === right.user.userData &&
      left.post.fetching.getPosts === right.post.fetching.getPosts
  );
  useEffect(() => {
    if (user.userData) {
      dispatch(getPostsAction.started({ userId: user.userData.id }));
    }
  }, [dispatch, user.userData]);

  function onLogout() {
    dispatch(logoutAction.started(undefined));
  }

  function onChangeFilter(value: string) {
    setFilter(value);
  }

  return (
    <div className={styles.home_wrapper}>
      <div className={styles.home_header}>
        SOME EMAIL: {user.userData ? user.userData.email : ""}
      </div>
      <div className={styles.filter}>
        <TextInput
          placeholder={"Filter"}
          value={filter}
          onChange={onChangeFilter}
        />
      </div>
      {post.postData &&
        post.postData.map(post => {
          if (post.title.toLowerCase().includes(filter.toLowerCase())) {
            return (
              <div key={post.id} className={styles.post}>
                {post.title}
              </div>
            );
          }
          return undefined;
        })}
      <Button
        className={styles.log_out_button}
        label={"Log Out"}
        onClick={onLogout}
      />
    </div>
  );
};

export default Home;

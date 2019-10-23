import React from "react";
import styles from "./scss/home.module.scss";
import { Button } from "../Form/button";
import {useDispatch, useSelector} from "react-redux";
import { logoutAction } from "../../modules/App/app.actions";
import {IAppState} from "../../modules/App/app.types";

export const Home: React.FC = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: IAppState) => state.user);

  function onLogout() {
    dispatch(logoutAction.started(undefined));
  }
  return (
    <div className={styles.home_wrapper}>
      HOME: {user.userData ? user.userData.email : ''}
      <Button label={"Log Out"} onClick={onLogout} />
    </div>
  );
};

export default Home;

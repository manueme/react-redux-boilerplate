import React, { useState } from "react";
import TextInput from "../Form/textInput";
import SubmitButton from "../Form/button";
import styles from "./scss/auth.module.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  ILoginActionInput,
  ISignUpActionInput,
  loginAction
} from "../../modules/Auth/auth.actions";
import { IAppState } from "../../modules/App/app.types";
import { getHomeRoute, getSignUpRoute } from "../../router/routes";
import { getStoredUserAuth } from "../../modules/Auth/auth";
import { IFormError, validateLoginForm } from "./validations";
import { Link, Redirect } from "react-router-dom";

export const Login: React.FC = () => {
  const dispatch = useDispatch();
  const auth = useSelector(
    (state: IAppState) => state.auth,
    (left, right) => left.fetching.login !== right.fetching.login
  );
  const [formResult, setFormResult] = useState<Partial<ILoginActionInput>>({});
  const [error, setError] = useState<IFormError<ILoginActionInput> | undefined>(
    undefined
  );

  if (getStoredUserAuth()) {
    return <Redirect to={getHomeRoute()} />;
  }

  function showError(error: IFormError<ILoginActionInput>) {
    setError(error);
  }

  function onChangeFormField(key: keyof ISignUpActionInput) {
    return (value: string) => {
      setFormResult({
        ...formResult,
        [key]: value.length > 0 ? value : undefined
      });
    };
  }

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (validateLoginForm(showError, formResult)) {
      dispatch(
        loginAction.started({
          email: formResult.email,
          password: formResult.password
        })
      );
    }
  }

  return (
    <div className={styles.login_wrapper}>
      <div className={styles.login_center}>
        <form className={styles.login_sign_up_form} onSubmit={onSubmit}>
          <TextInput
            className={styles.login_input}
            value={formResult.email || ''}
            onChange={onChangeFormField("email")}
            placeholder={"Email"}
            errorMessage={error && error.field === "email" ? error.error : ""}
          />
          <TextInput
            className={styles.login_input}
            value={formResult.password || ''}
            onChange={onChangeFormField("password")}
            placeholder={"Password"}
            showPassIcon={true}
            type={"password"}
            errorMessage={
              error && error.field === "password" ? error.error : ""
            }
          />
          <SubmitButton
            className={styles.login_input}
            label={auth.fetching.login ? "Logging in..." : "Log In"}
          />
        </form>
      </div>
      <div className={styles.login_center_footer}>
        <div className={styles.sign_up_message}>Don't have an account?</div>
        <Link className={styles.sign_up_link} to={getSignUpRoute()}>
          Sign Up
        </Link>
      </div>
    </div>
  );
};

export default Login;

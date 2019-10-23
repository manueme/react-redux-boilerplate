import React, { useState } from "react";
import TextInput from "../Form/textInput";
import SubmitButton from "../Form/button";
import styles from "./scss/auth.module.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  ISignUpActionInput,
  signUpAction
} from "../../modules/Auth/auth.actions";
import { IAppState } from "../../modules/App/app.types";
import { getLoginRoute, getHomeRoute } from "../../router/routes";
import { getStoredUserAuth } from "../../modules/Auth/auth";
import { IFormError, validateSignUpForm } from "./validations";
import {Link, Redirect} from "react-router-dom";

export const SignUp: React.FC = () => {
  const dispatch = useDispatch();
  const auth = useSelector(
    (state: IAppState) => state.auth,
    (left, right) => left.fetching.signUp !== right.fetching.signUp
  );
  const [formResult, setFormResult] = useState<Partial<ISignUpActionInput>>({});
  const [error, setError] = useState<
    IFormError<ISignUpActionInput> | undefined
  >(undefined);

  if (getStoredUserAuth()) {
    return <Redirect to={getHomeRoute()} />;
  }

  function showError(error: IFormError<ISignUpActionInput>) {
    setError(error);
  }

  function onChangeFormField<T>(key: keyof ISignUpActionInput) {
    return (value: T) => {
      setFormResult({
        ...formResult,
        [key]: value
      });
    };
  }

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (validateSignUpForm(showError, formResult)) {
      dispatch(signUpAction.started(formResult));
    }
  }

  return (
    <div className={styles.login_wrapper}>
      <div className={styles.sign_up_center}>
        <form className={styles.login_sign_up_form} onSubmit={onSubmit}>
          <div className={styles.sign_up_section}>
            <TextInput
              className={`${styles.sign_up_input} ${styles.column}`}
              value={formResult.name || ''}
              onChange={onChangeFormField("name")}
              placeholder={"Name"}
              errorMessage={
                error && error.field === "name" ? error.error : ""
              }
            />
            <TextInput
              className={`${styles.sign_up_input} ${styles.column}`}
              value={formResult.username || ''}
              onChange={onChangeFormField("username")}
              placeholder={"Username"}
              errorMessage={
                error && error.field === "username" ? error.error : ""
              }
            />
          </div>
          <TextInput
            className={styles.login_input}
            value={formResult.email || ''}
            onChange={onChangeFormField("email")}
            placeholder={"Email"}
            errorMessage={error && error.field === "email" ? error.error : ""}
          />
          <div className={styles.sign_up_section}>
            <TextInput
              className={`${styles.sign_up_input} ${styles.column}`}
              value={formResult.password || ''}
              onChange={onChangeFormField("password")}
              placeholder={"Password"}
              showPassIcon={true}
              type={"password"}
              errorMessage={
                error && error.field === "password" ? error.error : ""
              }
            />
            <TextInput
              className={`${styles.sign_up_input} ${styles.column}`}
              value={formResult.repeatPassword || ''}
              onChange={onChangeFormField("repeatPassword")}
              placeholder={"Repeat Password"}
              showPassIcon={true}
              type={"password"}
              errorMessage={
                error && error.field === "repeatPassword" ? error.error : ""
              }
            />
          </div>
          <SubmitButton
            className={styles.login_input}
            label={auth.fetching.signUp ? "Signing Up..." : "Sign Up"}
          />
        </form>
      </div>
      <div className={styles.login_center_footer}>
        <div className={styles.sign_up_message}>Already have an account?</div>
        <Link className={styles.sign_up_link} to={getLoginRoute()}>
          Log In
        </Link>
      </div>
    </div>
  );
};

export default SignUp;

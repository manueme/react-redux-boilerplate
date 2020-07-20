import {
  ILoginActionInput,
  ISignUpActionInput
} from "../../modules/Auth/auth.actions";
import validator from "validator";

export interface IFormError<T> {
  error: string;
  field: keyof T;
}

export function validateSignUpForm(
  setError: (error: IFormError<ISignUpActionInput>) => void,
  form: Partial<ISignUpActionInput>
): form is ISignUpActionInput {
  // Check for undefined or empty input fields
  if (!checkFieldsNotEmpty(setError, form)) {
    return false;
  }
  // Validate email
  if (!validator.isEmail(form.email ?? '')) {
    setError({ error: "Please enter a valid email address.", field: "email" });
    return false;
  }
  // Validate password
  if (!form.password || form.password.length < 5) {
    setError({
      error: "Password must contain 6 or more characters.",
      field: "password"
    });
    return false;
  }
  if (form.password !== form.repeatPassword) {
    setError({ error: "Passwords don't match.", field: "repeatPassword" });
    return false;
  }
  return true;
}

export function validateLoginForm(
  setError: (error: IFormError<ILoginActionInput>) => void,
  form: Partial<ILoginActionInput>
): form is ILoginActionInput {
  // Check for undefined or empty input fields
  if (!checkFieldsNotEmpty(setError, form)) {
    return false;
  }
  // Validate email
  if (!validator.isEmail(form.email)) {
    setError({ error: "Please enter a valid email address.", field: "email" });
    return false;
  }
  return true;
}

function checkFieldsNotEmpty<T>(
  setError: (error: IFormError<T>) => void,
  form: Partial<T>
): form is T {
  return !Object.keys(form).find(key => {
    const keyOf = key as keyof T;
    const value = form[keyOf];
    if (value === undefined || (typeof value === 'string' && value.length === 0)) {
      setError({
        error: "Please complete all the fields.",
        field: keyOf
      });
      return true;
    }
    return false;
  });
}

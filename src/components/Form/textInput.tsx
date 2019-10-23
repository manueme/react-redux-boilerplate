import React, { useState } from "react";
import styles from "./scss/textInput.module.scss";
import iconWarning from "./assets/ic_warning.svg";
import iconShowPass from "./assets/ic_showpass.svg";
import iconHidePass from "./assets/ic_hidepass.svg";

interface ITextInputProps {
  className?: string;
  label?: string;
  placeholder?: string;
  onChange?(value: string): void;
  type?: "text" | "password";
  value?: string;
  errorMessage?: string;
  showPassIcon?: boolean;
}

export const TextInput: React.FC<ITextInputProps> = ({
  className,
  label,
  value,
  placeholder,
  onChange,
  type,
  errorMessage,
  showPassIcon
}) => {
  const [showPass, setShowPass] = useState(false);

  function onInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (onChange) {
      onChange(event.target.value);
    }
  }

  function showHidePass() {
    setShowPass(!showPass);
  }
  const inputType = type === "password" && showPass ? "text" : type;

  let mainClassName = "";
  if (errorMessage) {
    mainClassName = `${className} ${styles.text_input_wrapper} ${styles.warning} ${styles.warning_message}`;
  } else {
    mainClassName = `${className} ${styles.text_input_wrapper}`;
  }

  return (
    <div className={mainClassName} data-tip={errorMessage}>
      {label && <label>{label}</label>}
      <input
        type={inputType || "text"}
        value={value}
        placeholder={placeholder}
        onChange={onInputChange}
      />
      <img src={iconWarning} alt="" title="" className={styles.warning_icon} />
      {showPassIcon && (
        <div className={styles.show_pass_icon} onClick={showHidePass}>
          <img
            src={showPass ? iconShowPass : iconHidePass}
            alt=""
            title=""
          />
        </div>
      )}
    </div>
  );
};

export default TextInput;

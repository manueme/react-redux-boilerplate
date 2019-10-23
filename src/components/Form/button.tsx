import React from "react";
import style from "./scss/button.module.scss";

interface ISubmitButtonProps {
  className?: string;
  label: string;
}

export const SubmitButton: React.FC<ISubmitButtonProps> = ({
  className,
  label
}) => {
  return (
    <div className={`${style.button_wrapper} ${className || ""}`}>
      <button type={"submit"}>{label}</button>
    </div>
  );
};

interface IButtonProps extends ISubmitButtonProps {
  onClick?(): void;
}

export const Button: React.FC<IButtonProps> = ({
  className,
  label,
  onClick
}) => {
  return (
    <div className={`${style.button_wrapper} ${className || ""}`}>
      <button type={"button"} onClick={onClick}>
        {label}
      </button>
    </div>
  );
};

export default SubmitButton;

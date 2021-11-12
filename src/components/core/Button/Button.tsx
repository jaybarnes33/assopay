import { joinClasses } from "@/utils/join-classes";
import { ButtonHTMLAttributes, forwardRef } from "react";
import styles from "./button.module.scss";

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "main" | "outlined";
  color?: "primary" | "light";
}

export const Button = forwardRef<HTMLButtonElement, IButtonProps>(
  function CustomButton(
    { onClick, children, variant, color, className, type, ...props },
    ref
  ) {
    return (
      <button
        ref={ref}
        className={joinClasses(
          className || "",
          styles.button,
          styles[`button-${variant}-${color}`]
        )}
        onClick={onClick}
        type={type}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.defaultProps = {
  type: "button",
  variant: "main",
  color: "primary",
};

export default Button;

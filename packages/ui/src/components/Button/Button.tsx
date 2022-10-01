import React from "react";
import styles from "./Button.module.css";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
}

const Button = ({
  variant = "primary",
  className,
  ...buttonProps
}: ButtonProps) => {
  return (
    <button
      className={`${styles.button} ${className} ${styles[variant]}`}
      {...buttonProps}
    >
      hi
    </button>
  );
};

export default Button;

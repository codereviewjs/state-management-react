import React from "react";
import styles from "./Button.module.css";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
  fluid?: boolean;
  outline?: boolean;
}

const Button = ({
  variant = "primary",
  className,
  fluid,
  outline,
  ...buttonProps
}: ButtonProps) => {
  return (
    <button
      className={`${styles.button} ${className} ${styles[variant]} 
      ${fluid && styles.fluid}
      ${outline && styles.outline}
      `}
      {...buttonProps}
    />
  );
};

export default Button;

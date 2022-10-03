import React from "react";
import styles from "./Button.module.css";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger";
  size?: "large" | "medium" | "small";
  fluid?: boolean;
  outline?: boolean;
}

const Button = ({
  variant = "primary",
  className,
  fluid,
  outline,
  size = "medium",
  ...buttonProps
}: ButtonProps) => {
  return (
    <button
      className={`${styles.button} ${className} ${styles[variant] || ""} 
      ${(fluid && styles.fluid) || ""}
      ${(outline && styles.outline) || ""}
      ${styles[size] || ""}
      `}
      {...buttonProps}
    />
  );
};

export default Button;

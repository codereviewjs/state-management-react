import React from "react";
import styles from "./Button.module.css";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger";
  size?: "large" | "medium" | "small";
  fluid?: boolean;
  outline?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      className,
      fluid,
      outline,
      size = "medium",
      ...buttonProps
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        className={`${styles.button} ${className} ${styles[variant] || ""} 
      ${(fluid && styles.fluid) || ""}
      ${(outline && styles.outline) || ""}
      ${styles[size] || ""}
      `}
        {...buttonProps}
      />
    );
  }
);

Button.displayName = "Button";
export default Button;

import React from "react";
import styles from "./Input.module.css";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>

const Input = ({ className, ...inputProps }: InputProps) => {
  return <input className={`${styles.input} ${className}`} {...inputProps} />;
};

export default Input;

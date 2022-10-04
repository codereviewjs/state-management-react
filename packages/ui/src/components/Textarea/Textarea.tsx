import React from "react";
import styles from "./Textarea.module.css";

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

const Textarea = ({ className, ...textareaProps }: TextareaProps) => {
  return (
    <textarea
      className={`${styles.textarea} ${className}`}
      {...textareaProps}
    />
  );
};

export default Textarea;

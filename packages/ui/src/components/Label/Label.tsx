import React from "react";
import styles from "./Label.module.css";

export interface LabelProps
  extends React.LabelHTMLAttributes<HTMLLabelElement> {
  label: string;
}

const Label = ({ className, children, label, ...labelProps }: LabelProps) => {
  return (
    <label className={`${styles.label} ${className}`} {...labelProps}>
      {label}
      {children}
    </label>
  );
};

export default Label;

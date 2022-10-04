import React from "react";
import styles from "./Dropdown.module.css";

type Option = { value: string; content: string };
export interface DropdownProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: Option[];
}

const Dropdown = ({ className, options, ...dropdownProps }: DropdownProps) => {
  return (
    <div className={styles.wrapper}>
      <select className={`${styles.select} ${className}`} {...dropdownProps}>
        {options.map((option) => (
          <option key={option.value} {...option}>
            {option.content}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;

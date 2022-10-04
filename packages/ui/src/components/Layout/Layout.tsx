import React from "react";
import styles from "./Layout.module.css";

export interface Props {
  children: React.ReactNode;
  className?: string;
  title: string;
}

const Layout = ({ title, children, className }: Props) => {
  return (
    <div className={`${styles.layout} ${className}`}>
      <h1>{title}</h1>
      {children}
    </div>
  );
};

export default Layout;

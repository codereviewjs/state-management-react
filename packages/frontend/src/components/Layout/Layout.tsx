import styles from "./Layout.module.css";

interface Props {
  children: React.ReactNode;
  title: string;
}

const Layout = ({ title, children }: Props) => {
  return (
    <div className={styles.layout}>
      <h1>{title}</h1>
      {children}
    </div>
  );
};

export default Layout;

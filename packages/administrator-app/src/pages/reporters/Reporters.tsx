import { Layout } from "ui";
import { useStoreContext } from "../../context/Store.context";
import styles from "./Reporters.module.css";
import { ThemeCard } from "../../components";

const Reporters = () => {
  const { reporters } = useStoreContext();
  return (
    <Layout title='Reporters'>
      <div className={styles.container}>
        {reporters.map((reporter) => (
          <div>{reporter.name}</div>
        ))}
      </div>
    </Layout>
  );
};

export default Reporters;

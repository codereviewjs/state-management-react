import { Link } from "react-router-dom";
import { Layout } from "ui";
import { routes } from "../../constants/routes.constants";
import { useStoreContext } from "../../context/Store.context";
import styles from "./Main.module.css";

const Main = () => {
  const { reports, reporters } = useStoreContext();

  return (
    <Layout title='Hello'>
      <div>hi</div>
    </Layout>
  );
};

export default Main;

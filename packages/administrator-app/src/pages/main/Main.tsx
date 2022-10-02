import { Link } from "react-router-dom";
import { Layout } from "ui";
import { routes } from "../../constants/routes.constants";
import { useStoreContext } from "../../context/store/Store.context";
import styles from "./Main.module.css";

const Main = () => {
  const { reports, user } = useStoreContext();
  const userName = user?.admin ? "Admin" : user?.reporter?.firstName || "";

  return (
    <Layout title={`Hello ${userName}`}>
      <div>
        <h3>Your'e reports</h3>
        {
          reports.map(report => <pre key={report._id}>{JSON.stringify(report,null,2)}</pre>)
        }
      </div>
    </Layout>
  );
};

export default Main;

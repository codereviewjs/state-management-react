import { Layout } from "ui";
import { ThemeCard } from "../../components";
import { useStoreContext } from "../../context/Store.context";
import styles from "./Reports.module.css";

const Reports = () => {
  const { reports } = useStoreContext();

  return (
    <Layout title='Reports'>
      <div>
        {reports.map((report) => {
          return <div>a</div>;
        })}
      </div>
    </Layout>
  );
};

export default Reports;

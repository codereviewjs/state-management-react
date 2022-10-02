import { Layout } from "ui";
import { useStoreContext } from "../../context/store/Store.context";
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

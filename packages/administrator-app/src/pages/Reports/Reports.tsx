import { Layout } from "ui";
import { useStoreContext } from "../../context/store/Store.context";

const Reports = () => {
  const { reports } = useStoreContext();

  return (
    <Layout title='Reports'>
      <div>
        {reports.data.map((report) => {
          return <div>a</div>;
        })}
      </div>
    </Layout>
  );
};

export default Reports;

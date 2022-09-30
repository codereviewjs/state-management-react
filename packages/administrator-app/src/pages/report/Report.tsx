import { useParams, Link } from "react-router-dom";
import { Layout } from "ui";
import { routes } from "../../constants/routes.constants";
import { useStoreContext } from "../../context/Store.context";

const Report = () => {
  const { getReportById } = useStoreContext();

  const { id } = useParams();
  const report = getReportById(id);

  if (!report) {
    return <div>Report not found</div>;
  }

  return (
    <Layout title={report.title}>
      <h2>
        <Link to={`${routes.reporters.root}/${report._id}`}>{report._id}</Link>
      </h2>
    </Layout>
  );
};

export default Report;

import { useParams, Link } from "react-router-dom";
import { Button, Layout } from "ui";
import { routes } from "../../constants/routes.constants";
import { useStoreContext } from "../../context/store/Store.context";

const Report = () => {
  const { getReportById } = useStoreContext();

  const { id } = useParams();
  const report = getReportById(id);

  if (!report) {
    return <div>Report not found</div>;
  }

  return (
    <Layout title={report.title}>
      <div>
        <div>{report.category}</div>
        <div>{new Date(report.date).toDateString()}</div>
      </div>
      <p>{report.description}</p>
      <div>
        <Button>Edit</Button>
        <Button>Delete</Button>
      </div>
    </Layout>
  );
};

export default Report;

import { Link, useNavigate, useParams } from "react-router-dom";
import { Button, Layout } from "ui";
import { routes } from "../../constants/routes.constants";
import { useStoreContext } from "../../context/store/Store.context";
import { routeUtils } from "../../utils/route.utils";
import styles from "./Report.module.css";

const Report = () => {
  const { getReportById, deleteReport } = useStoreContext();
  const navigate = useNavigate();
  const { id } = useParams();
  const report = getReportById(id);

  if (!id || !report) {
    return <div>Report not found</div>;
  }

  const handleDelete = async () => {
    await deleteReport(id);
    navigate(routes.main.root);
  };

  return (
    <Layout title={report.title}>
      <div className={styles.reportMetadataContainer}>
        <div>{report.category}</div>
        <div>{new Date(report.date).toDateString()}</div>
      </div>
      <p>{report.description}</p>

      <div className={styles.buttonsContainer}>
        <Link
          to={routeUtils.replaceIdParamWithValue(routes.reports.reportEdit, id)}
        >
          <Button size='large'>Edit</Button>
        </Link>

        <Button onClick={handleDelete} size='large' variant='danger'>
          Delete
        </Button>
      </div>
    </Layout>
  );
};

export default Report;

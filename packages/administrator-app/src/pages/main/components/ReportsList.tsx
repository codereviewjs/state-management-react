import { useNavigate, Link } from "react-router-dom";
import { IReportDTO } from "types";
import { Card } from "ui";
import { useStoreContext } from "../../../context/store/Store.context";
import { routesWithParams } from "../../../utils/route.utils";
import styles from "../Main.module.css";

interface ReportCardProps {
  report: IReportDTO;
  onEditClick: (id: string) => void;
  onDeleteClick: (id: string) => void;
}
const ReportCard = ({
  report,
  onDeleteClick,
  onEditClick,
}: ReportCardProps) => {
  return (
    <Card key={report._id} className={styles.card}>
      <Card.Header className={styles.cardHeader}>{report.title}</Card.Header>
      <Card.Content className={styles.cardContent}>
        <div>
          <div className={styles.cardContentHeader}>
            <span>{report.category}</span>
            <span>{new Date(report.date).toLocaleString()}</span>
          </div>
          <p>{report.description}</p>
        </div>
      </Card.Content>
      <Card.Footer style={{ fontSize: 14 }} flex='space-between'>
        <Link to={routesWithParams.reports.report(report._id || "")}>
          Read more
        </Link>
        <Card.ActionButtons
          primaryButtonProps={{
            content: "Edit",
            onClick: () => report._id && onEditClick(report._id),
          }}
          dangerButtonProps={{
            content: "Delete",
            onClick: () => report._id && onDeleteClick(report._id),
          }}
        />
      </Card.Footer>
    </Card>
  );
};
const ReportsList = () => {
  const { reports, deleteReport } = useStoreContext();
  const navigate = useNavigate();

  return (
    <div>
      <h3>Your'e reports</h3>
      <div className={styles.cards}>
        {reports.data.map((report) => (
          <ReportCard
            key={report._id}
            report={report}
            onEditClick={(id) =>
              navigate(routesWithParams.reports.reportEdit(id))
            }
            onDeleteClick={(id) => deleteReport(id)}
          />
        ))}
      </div>
    </div>
  );
};

export default ReportsList;

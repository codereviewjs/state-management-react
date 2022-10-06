import { Link } from "react-router-dom";
import { IReporter } from "types";
import { Card } from "ui";
import { routes } from "../../../constants/routes.constants";
import { useStoreContext } from "../../../context/store/Store.context";
import { routesWithParams } from "../../../utils/route.utils";
import styles from "../Main.module.css";

interface ReporterCardProps {
  reporter: IReporter;
  onDeleteClick: (id: string) => void;
}
const ReporterCard = ({ reporter, onDeleteClick }: ReporterCardProps) => {
  return (
    <Card key={reporter._id} className={styles.card}>
      <Card.Header className={styles.cardHeader}>
        {reporter.firstName} {reporter.lastName}
      </Card.Header>
      <Card.Content className={styles.cardContent}>
        <ul className={styles.reportsList}>
          {reporter.reports.map((report) => (
            <li key={report._id}>
              <Link to={routesWithParams.reports.report(report._id || "")}>
                {report.title}
              </Link>
              <div>
                <small>{new Date(report.date).toDateString()}</small>
              </div>
            </li>
          ))}
        </ul>
      </Card.Content>
      <Card.Footer style={{ fontSize: 14 }} flex='center'>
        <Card.ActionButtons
          dangerButtonProps={{
            content: "Delete",
            onClick: () => reporter._id && onDeleteClick(reporter._id),
          }}
        />
      </Card.Footer>
    </Card>
  );
};

const ReportersList = () => {
  const { reporters, deleteReporter } = useStoreContext();

  return (
    <div>
      <h3>Reporters</h3>
      <div className={styles.cards}>
        {reporters.data.map((reporter) => (
          <ReporterCard
            key={reporter._id}
            reporter={reporter}
            onDeleteClick={(id) => deleteReporter(id)}
          />
        ))}
      </div>
    </div>
  );
};

export default ReportersList;

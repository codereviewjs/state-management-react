import { Link, useNavigate } from "react-router-dom";
import { Roles } from "types";
import { Layout, Card } from "ui";
import { routes } from "../../constants/routes.constants";
import { useStoreContext } from "../../context/store/Store.context";
import { routeUtils } from "../../utils/route.utils";
import styles from "./Main.module.css";

const Main = () => {
  const { reports, user, deleteReport } = useStoreContext();
  const navigate = useNavigate();
  const userName =
    user?.role === Roles.ADMIN ? "Admin" : user?.reporter?.firstName || "";

  return (
    <Layout title={`Hello ${userName}`}>
      <div>
        <h3>Your'e reports</h3>
        <div className={styles.cards}>
          {reports.map((report) => (
            <Card key={report._id} className={styles.card}>
              <Card.Header className={styles.cardHeader}>
                {report.title}
              </Card.Header>
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
                <Link
                  to={routeUtils.replaceIdParamWithValue(
                    routes.reports.report,
                    report._id || ""
                  )}
                >
                  Read more
                </Link>
                <Card.ActionButtons
                  primaryButtonProps={{
                    content: "Edit",
                    onClick: () =>
                      report._id &&
                      navigate(
                        routeUtils.replaceIdParamWithValue(
                          routes.reports.reportEdit,
                          report._id
                        )
                      ),
                  }}
                  dangerButtonProps={{
                    content: "Delete",
                    onClick: () => report._id && deleteReport(report._id),
                  }}
                />
              </Card.Footer>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Main;

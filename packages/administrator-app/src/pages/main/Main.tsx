import { Link } from "react-router-dom";
import { Layout, Card } from "ui";
import { routes } from "../../constants/routes.constants";
import { useStoreContext } from "../../context/store/Store.context";
import { routeUtils } from "../../utils/route.utils";
import styles from "./Main.module.css";

const Main = () => {
  const { reports, user } = useStoreContext();
  const userName = user?.admin ? "Admin" : user?.reporter?.firstName || "";

  return (
    <Layout title={`Hello ${userName}`}>
      <div>
        <h3>Your'e reports</h3>
        <div className={styles.cards}>
          {reports.map((report) => (
            <Card className={styles.card}>
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
                    report._id
                  )}
                >
                  Read more
                </Link>
                <Card.ActionButtons
                  primaryButtonProps={{ content: "Edit" }}
                  secondaryButtonProps={{ content: "Delete" }}
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

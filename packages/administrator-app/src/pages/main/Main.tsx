import { Link } from "react-router-dom";
import { Layout } from "ui";
import { routes } from "../../constants/routes.constants";
import { useStoreContext } from "../../context/Store.context";
import styles from "./Main.module.css";

const Main = () => {
  const { reports, reporters } = useStoreContext();

  return (
    <Layout title='Reporters and reports'>
      <div className={styles.listsContainer}>
        <div>
          <h2>Themes</h2>
          <h3>
            <Link to={routes.reports.root}>To all reports</Link>
          </h3>
          <ul>
            {reports.map((report) => (
              <li key={`${report.title}-${report._id}`}>
                <Link to={`${routes.reports.root}/${report._id}`}>
                  {report.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2>Reporters</h2>
          <h3>
            <Link to={routes.reporters.root}>To all reporters</Link>
          </h3>
          <ul>
            {reporters.map((author) => (
              <li key={author.name}>
                <Link to={`${routes.reporters.root}/${author._id}`}>
                  {author.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Layout>
  );
};

export default Main;

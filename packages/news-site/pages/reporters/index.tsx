import { reportersApi } from "api";
import { GetServerSideProps, NextPage } from "next";
import Link from "next/link";
import { IReporterDTO } from "types";
import { Card, Layout } from "ui";
import styles from "../../styles/reporters.module.css";
import { routesWithParams } from "../../utils/route.utils";
interface Props {
  reporters: IReporterDTO[];
}

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const reporters = await reportersApi.getAll();

  return {
    props: {
      reporters: reporters.reporters,
    },
  };
};

const Reporters: NextPage<Props> = ({ reporters }) => {
  return (
    <Layout className={styles.container} title='Reporters'>
      <div className={styles.cards}>
        {reporters.map((reporter) => (
          <Card key={reporter._id} className={styles.card}>
            <Card.Header className={styles.cardHeader}>
              <Link
                href={routesWithParams.reporters.reporter(reporter._id || "")}
                passHref
              >
                <a>{reporter.name}</a>
              </Link>
            </Card.Header>
            <Card.Content className={styles.cardContent}>
              <ul className={styles.reportsList}>
                {reporter.reports.map((report) => (
                  <li key={report._id}>
                    <Link
                      href={routesWithParams.reports.report(report._id || "")}
                    >
                      <a>{report.title}</a>
                    </Link>
                    <div>
                      <small>{new Date(report.date).toDateString()}</small>
                    </div>
                  </li>
                ))}
              </ul>
            </Card.Content>
            <Card.Footer flex='center'>{reporter.email}</Card.Footer>
          </Card>
        ))}
      </div>
    </Layout>
  );
};

export default Reporters;

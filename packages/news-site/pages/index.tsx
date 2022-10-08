import type { NextPage, GetStaticProps } from "next";
import { reportsApi } from "api";
import { IReportDTO } from "types";
import styles from "../styles/index.module.css";
import { Card, Layout } from "ui";
import Link from "next/link";
import { routesWithParams } from "../utils/route.utils";

interface Props {
  reports: IReportDTO[];
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const reportsResponse = await reportsApi.getAll();

  return {
    props: {
      reports: reportsResponse.reports,
    },
  };
};

const Home: NextPage<Props> = ({ reports }) => {
  return (
    <Layout title='Reports'>
      <div className={styles.container}>
        {reports.map((report) => (
          <Card className={styles.card} key={report._id}>
            <Card.Header>
              <Link
                href={routesWithParams.reports.report(report._id || "")}
                passHref
              >
                {report.title}
              </Link>
              -{" "}
              <small>
                by{" "}
                <Link
                  href={routesWithParams.reporters.reporter(
                    report.reporterId || ""
                  )}
                  passHref
                >
                  <a>{report.reporterName}</a>
                </Link>
              </small>
            </Card.Header>
            <Card.Content>{report.description}</Card.Content>
            <Card.Footer flex='space-between'>
              <div>Category - {report.category}</div>
              <div>{new Date(report.date).toDateString()}</div>
            </Card.Footer>
          </Card>
        ))}
      </div>
    </Layout>
  );
};

export default Home;

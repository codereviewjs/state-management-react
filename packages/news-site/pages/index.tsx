import type { NextPage, GetStaticProps } from "next";
import { reportsApi } from "api";
import { IReport } from "types";
import styles from "../styles/index.module.css";
import { Card, Layout } from "ui";
import Link from "next/link";

interface Props {
  reports: IReport[];
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
              <Link href={`/report/${report._id}`} passHref>
                {report.title}
              </Link>
              -{" "}
              <small>
                by{" "}
                <Link href={`/reporters/${report.reporter._id}`} passHref>
                  <a>
                    {report.reporter.firstName} {report.reporter.lastName}
                  </a>
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

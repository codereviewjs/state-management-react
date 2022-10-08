import type { NextPage, GetStaticProps } from "next";
import { useSession } from "next-auth/react";
import { reportsApi } from "api";
import { IReportDTO } from "types";
import styles from "../styles/index.module.css";
import { Button, Card, Layout } from "ui";
import Link from "next/link";
import { routesWithParams } from "../utils/route.utils";
import { useEffect, useState } from "react";

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
  const [reportsLocal, setReportsLocal] = useState(reports);

  const fetchReports = async () => {
    const { reports } = await reportsApi.getAll();
    setReportsLocal(reports);
  };

  const handleLike = async (reportId: string) => {
    const { report } = await reportsApi.like(reportId);
    setReportsLocal((prevReports) =>
      prevReports.map((prevReport) => {
        if (prevReport._id === report._id) {
          return {
            ...prevReport,
            ...report,
          };
        }

        return prevReport;
      })
    );
  };

  useEffect(() => {
    fetchReports();
  }, []);

  return (
    <Layout title='Reports'>
      <div className={styles.container}>
        {reportsLocal.map((report) => (
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
              <div style={{ display: "flex", gap: 8 }}>
                <span>{report.category}</span>
                <span>|</span>
                <span>{new Date(report.date).toDateString()}</span>
              </div>
              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <span>{report.likesCount}</span>
                <Button onClick={() => handleLike(report._id || "")}>
                  {report.isLiked ? "unlike" : "Like"}
                </Button>
              </div>
            </Card.Footer>
          </Card>
        ))}
      </div>
    </Layout>
  );
};

export default Home;

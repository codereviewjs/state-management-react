import type { NextPage, GetStaticProps } from "next";
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
    revalidate: 10,
  };
};

const Home: NextPage<Props> = ({ reports }) => {
  const [reportsLocal, setReportsLocal] = useState(reports);
  const [isLoading, setIsLoading] = useState(false);

  const fetchReports = async () => {
    setIsLoading(true);
    const { reports } = await reportsApi.getAll();
    setReportsLocal(reports);
    setIsLoading(false);
  };

  const handleLike = async (reportId: string) => {
    setReportsLocal((prevReports) =>
      prevReports.map((prevReport) => {
        if (prevReport._id === reportId) {
          const isAlreadyLiked = prevReport.isLiked;

          return {
            ...prevReport,
            isLiked: !isAlreadyLiked,
            likesCount: isAlreadyLiked
              ? prevReport.likesCount - 1
              : prevReport.likesCount + 1,
          };
        }

        return prevReport;
      })
    );
    await reportsApi.like(reportId);
  };

  useEffect(() => {
    fetchReports();
  }, []);

  if (!reports.length) {
    return (
      <Layout title='No reports'>
        <p>Please verify your internet connection</p>
      </Layout>
    );
  }
  return (
    <Layout title='Reports'>
      <div className={styles.container}>
        {reportsLocal.map((report) => (
          <Card
            data-testid={`report-card-${report._id}`}
            className={styles.card}
            key={report._id}
          >
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
              {!isLoading && (
                <div
                  data-testid='likes-container'
                  style={{ display: "flex", gap: 8, alignItems: "center" }}
                >
                  <span>{report.likesCount} likes</span>
                  <Button
                    size='small'
                    onClick={() => handleLike(report._id || "")}
                  >
                    {report.isLiked ? "unlike" : "Like"}
                  </Button>
                </div>
              )}
            </Card.Footer>
          </Card>
        ))}
      </div>
    </Layout>
  );
};

export default Home;

import { reportsApi } from "api";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { IReport } from "types";
import { Layout } from "ui";

interface Props {
  report: IReport;
}

export const getStaticProps: GetStaticProps<Props, { id: string }> = async (
  ctx
) => {
  const reportResponse = await reportsApi.getOne(ctx.params?.id || "");
  return {
    props: {
      report: reportResponse.report,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const reportsResponse = await reportsApi.getAll();

  return {
    paths: reportsResponse.reports.map((report) => ({
      params: { id: report._id },
    })),
    fallback: false,
  };
};

const Report: NextPage<Props> = ({ report }) => {
  return (
    <Layout title={report.title}>
      <div>{report.description}</div>
    </Layout>
  );
};

export default Report;

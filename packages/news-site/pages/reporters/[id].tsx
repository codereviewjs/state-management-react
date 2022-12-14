import { reportersApi } from "api";
import { GetServerSideProps, NextPage } from "next";
import { IReporterDTO } from "types";
import { Layout, Spinner } from "ui";

interface Props {
  reporter: IReporterDTO;
}

export const getServerSideProps: GetServerSideProps<Props, { id: string }> =
  async (ctx) => {
    const reporterResponse = await reportersApi.getOne(ctx.params?.id || "");

    return {
      props: {
        reporter: reporterResponse.reporter,
      },
    };
  };

const Reporter: NextPage<Props> = ({ reporter }) => {
  if (!reporter) {
    return <Spinner fullscreen />;
  }
  return (
    <Layout title={`${reporter.name}`}>
      <ul>
        {reporter.reports.map((report) => (
          <li key={report._id}>{report.title}</li>
        ))}
      </ul>
    </Layout>
  );
};

export default Reporter;

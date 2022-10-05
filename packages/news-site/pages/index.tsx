import type { NextPage, GetStaticProps } from "next";
import { reportsApi, reportersApi } from "api";

export const getStaticProps: GetStaticProps = async () => {
  const reportersResponse = await reportersApi.getAll();
  const reportsResponse = await reportsApi.getAll();

  return {
    props: {
      reports: reportsResponse.reports,
      reporters: reportersResponse.reporters,
    },
  };
};
const Home: NextPage = ({ reports, reporters }) => {
  return (
    <div className='app'>
      <pre>{JSON.stringify(reports, null, 2)}</pre>
      <pre>{JSON.stringify(reporters, null, 2)}</pre>
    </div>
  );
};

export default Home;

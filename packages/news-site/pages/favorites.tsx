import { GetServerSideProps, NextPage } from "next";
import { Layout } from "ui";
import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "./api/auth/[...nextauth]";
import { userApi } from "api";
import { IReportDTO } from "types";
import Link from "next/link";
import { routesWithParams } from "../utils/route.utils";

interface Props {
  likedReports: IReportDTO[];
}
export const getServerSideProps: GetServerSideProps<Props> = async ({
  req,
  res,
}) => {
  const response = await unstable_getServerSession(req, res, authOptions);

  if (response?.accessToken) {
    try {
      const { user } = await userApi.me({
        authorization: response.accessToken as string,
      });

      return {
        props: {
          likedReports: user.likedReports,
        },
      };
    } catch (e) {
      return {
        props: {
          likedReports: [],
        },
      };
    }
  }

  return {
    redirect: {
      permanent: false,
      destination: "/",
    },
  };
};

const Favorites: NextPage<Props> = ({ likedReports }) => {
  return (
    <Layout title='Likes reports'>
      <h3>Likes reports</h3>
      <ul>
        {likedReports.map((report) => {
          return (
            <li key={report._id}>
              <Link href={routesWithParams.reports.report(report._id || "")}>
                <a>{report.title}</a>
              </Link>
            </li>
          );
        })}
      </ul>
    </Layout>
  );
};

export default Favorites;

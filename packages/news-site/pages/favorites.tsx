import { GetServerSideProps, NextPage } from "next";
import { Layout } from "ui";
import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "./api/auth/[...nextauth]";
import { userApi } from "api";
import { IReportDTO } from "types";

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

const Favorites: NextPage<Props> = (props) => {
  console.log(props.likedReports);

  return (
    <Layout title='Favorites'>
      <div>Favorites</div>
    </Layout>
  );
};

export default Favorites;

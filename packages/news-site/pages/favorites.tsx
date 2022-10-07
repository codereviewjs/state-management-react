import { GetServerSideProps, NextPage } from "next";
import { Layout } from "ui";
import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "./api/auth/[...nextauth]";

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const response = await unstable_getServerSession(req, res, authOptions);

  if (response?.accessToken) {
    return {
      props: {},
      redirect: {
        permanent: false,
        destination: "/",
      },
    };
  }

  return {
    props: {},
    redirect: {
      permanent: false,
      destination: "/",
    },
  };
};

const Favorites: NextPage = () => {
  return (
    <Layout title='Favorites'>
      <div>Favorites</div>
    </Layout>
  );
};

export default Favorites;

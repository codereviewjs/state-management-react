import { Roles } from "types";
import { Layout } from "ui";
import { useStoreContext } from "../../context/store/Store.context";
import ReportersList from "./components/ReportersList";
import ReportsList from "./components/ReportsList";

const Main = () => {
  const { user } = useStoreContext();
  const isAdmin = user.data?.role === Roles.ADMIN;
  const userName = isAdmin ? "Admin" : user.data?.reporter?.firstName || "";

  return (
    <Layout title={`Hello ${userName}`}>
      {isAdmin ? <ReportersList /> : <ReportsList />}
    </Layout>
  );
};

export default Main;

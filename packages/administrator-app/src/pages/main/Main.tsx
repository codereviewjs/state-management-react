import { Roles } from "types";
import { Layout } from "ui";
import { useStoreContext } from "../../context/store/Store.context";
import ReportersList from "./components/ReportersList";
import ReportsList from "./components/ReportsList";

const Main = () => {
  const { auth } = useStoreContext();
  const isAdmin = auth.data?.role === Roles.ADMIN;
  const userName = isAdmin ? "Admin" : auth.data?.firstName || "";

  return (
    <Layout title={`Hello ${userName}`}>
      {isAdmin ? <ReportersList /> : <ReportsList />}
    </Layout>
  );
};

export default Main;

import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { ITheme, Roles } from "types";
import { setCssVars, Spinner } from "ui";
import "./App.css";
import { Navbar, RequiredRole } from "./components";
import { routes } from "./constants/routes.constants";
import { useStoreContext } from "./context/store/Store.context";
import {
  Reports,
  Report,
  Main,
  Login,
  ReportEdit,
  ReportCreate,
} from "./pages";
import { storeUtils } from "./utils/store.utils";

const theme: ITheme = {
  backgroundColor: "#242424",
  primaryColor: "#646cff",
  secondaryColor: "#1a1a1a",
  textColor: "#ffffff",
};

function App() {
  const { user, reporters, reports } = useStoreContext();

  useEffect(() => {
    setCssVars(theme);
  }, [setCssVars]);

  if (
    storeUtils.isPendingStatus(user.status) ||
    (user.isLoggedIn &&
      ((user.data?.role === Roles.ADMIN &&
        storeUtils.isPendingStatus(reporters.status)) ||
        storeUtils.isPendingStatus(reports.status)))
  ) {
    return <Spinner fullscreen />;
  }

  if (!user.isLoggedIn) {
    return <Login />;
  }

  return (
    <div className='App'>
      <Navbar />
      <Routes>
        <Route path={routes.main.root} element={<Main />} />
        <Route path={routes.reports.root} element={<Reports />} />
        <Route path={routes.reports.report} element={<Report />} />
        <Route
          path={routes.reports.reportEdit}
          element={
            <RequiredRole role={Roles.REPORTER}>
              <ReportEdit />
            </RequiredRole>
          }
        />
        <Route
          path={routes.reports.reportCreate}
          element={
            <RequiredRole role={Roles.REPORTER}>
              <ReportCreate />
            </RequiredRole>
          }
        />
      </Routes>
    </div>
  );
}

export default App;

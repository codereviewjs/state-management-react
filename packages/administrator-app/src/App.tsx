import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { ITheme } from "types";
import { setCssVars } from "ui";
import "./App.css";
import { Navbar } from "./components";
import { routes } from "./constants/routes.constants";
import { useStoreContext } from "./context/store/Store.context";
import { Reports, Report, Main, Login } from "./pages";

function App() {
  const { isDataPending, metadata, isLoggedIn } = useStoreContext();

  if (isDataPending) {
    return <h4>Loading</h4>;
  }

  useEffect(() => {
    if (metadata && metadata.theme) {
      setCssVars(metadata.theme);
    }
  }, [metadata, setCssVars]);

  if (!isLoggedIn) {
    return <Login />;
  }

  return (
    <div className='App'>
      <Navbar />
      <Routes>
        <Route path={routes.main.root} element={<Main />} />
        <Route path={routes.reports.root} element={<Reports />} />
        <Route path={routes.reports.report} element={<Report />} />
      </Routes>
    </div>
  );
}

export default App;

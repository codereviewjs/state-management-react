import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { ITheme } from "types";
import { setCssVars } from "ui";
import "./App.css";
import { Navbar } from "./components";
import { routes } from "./constants/routes.constants";
import { useStoreContext } from "./context/store/Store.context";
import { Reports, Report, Main, Login } from "./pages";

const theme: ITheme = {
  backgroundColor: "#242424",
  primaryColor: "#646cff",
  secondaryColor: "#1a1a1a",
  textColor: "#ffffff",
};

function App() {
  const { isDataPending, isLoggedIn } = useStoreContext();

  if (isDataPending) {
    return <h4>Loading</h4>;
  }

  useEffect(() => {
    setCssVars(theme);
  }, [setCssVars]);

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

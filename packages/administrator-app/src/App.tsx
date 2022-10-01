import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { ITheme } from "types";
import "./App.css";
import { Navbar } from "./components";
import { routes } from "./constants/routes.constants";
import { useStoreContext } from "./context/Store.context";
import { Reports, Report, Main, Reporters, Reporter, Login } from "./pages";

function App() {
  const { isDataPending, isAuthPending, isLoggedIn, selectedTheme } =
    useStoreContext();

  if (isDataPending) {
    return <h4>Loading</h4>;
  }

  useEffect(() => {
    if (selectedTheme) {
      const colors: (keyof Omit<ITheme, "_id">)[] = [
        "primaryColor",
        "secondaryColor",
        "backgroundColor",
        "textColor",
      ];

      colors.forEach((color) => {
        document.documentElement.style.setProperty(
          `--${color}`,
          selectedTheme[color]
        );
      });
    }
  }, [selectedTheme]);

  if (!isLoggedIn) {
    return <Login />;
  }

  return (
    <div className='App'>
      <Navbar />
      <Routes>
        <Route path={routes.main.root} element={<Main />} />
        <Route path={routes.reports.root} element={<Reports />} />
        <Route path={routes.reports.theme} element={<Report />} />
        <Route path={routes.reporters.root} element={<Reporters />} />
        <Route path={routes.reporters.author} element={<Reporter />} />
      </Routes>
    </div>
  );
}

export default App;

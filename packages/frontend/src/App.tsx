import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Navbar } from "./components";
import { routes } from "./constants/routes.constants";
import { colors } from "./constants/theme.constants";
import { useStoreContext } from "./context/Store.context";
import { Themes, Theme, Main, Authors, Author } from "./pages";

function App() {
  const { isPending, theme } = useStoreContext();

  if (isPending) {
    return <h4>Loading</h4>;
  }

  useEffect(() => {
    colors.forEach((color) => {
      document.documentElement.style.setProperty(`--${color}`, theme[color]);
    });
  }, [theme]);

  return (
    <div className='App'>
      <Navbar />
      <Routes>
        <Route path={routes.main.root} element={<Main />} />
        <Route path={routes.themes.root} element={<Themes />} />
        <Route path={routes.themes.theme} element={<Theme />} />
        <Route path={routes.authors.root} element={<Authors />} />
        <Route path={routes.authors.author} element={<Author />} />
      </Routes>
    </div>
  );
}

export default App;

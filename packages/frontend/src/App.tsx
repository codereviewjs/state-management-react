import { Route, Routes } from "react-router-dom";
import "./App.css";
import { routes } from "./constants/routes.constants";
import { useStoreContext } from "./context/Store.context";
import { Themes, Theme, Main } from "./pages";

function App() {
  const { isPending } = useStoreContext();

  if (isPending) {
    return <h4>Loading</h4>;
  }

  return (
    <div className='App'>
      <Routes>
        <Route path={routes.main.root} element={<Main />} />
        <Route path={routes.themes.root} element={<Themes />} />
        <Route path={routes.themes.theme} element={<Theme />} />
      </Routes>
    </div>
  );
}

export default App;

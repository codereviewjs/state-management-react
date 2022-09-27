import { Route, Routes } from "react-router-dom";
import "./App.css";
import { routes } from "./constants/routes.constants";
import { useStoreContext } from "./context/Store.context";
import { Books, Book, Main } from "./pages";

function App() {
  const { isPending } = useStoreContext();

  if (isPending) {
    return <h4>Loading</h4>;
  }

  return (
    <div className='App'>
      <Routes>
        <Route path={routes.main.root} element={<Main />} />
        <Route path={routes.books.root} element={<Books />} />
        <Route path={routes.books.book} element={<Book />} />
      </Routes>
    </div>
  );
}

export default App;

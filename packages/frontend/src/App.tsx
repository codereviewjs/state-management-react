import { Route, Routes } from "react-router-dom";
import "./App.css";
import { routes } from "./constants/routes.constants";
import { useAuthorsContext } from "./context/Authors.context";
import { useBooksContext } from "./context/Books.context";
import { Books, Book, Main } from "./pages";

function App() {
  const { isPending: isBooksPending } = useBooksContext();
  const { isPending: isAuthorsPending } = useAuthorsContext();

  if (isBooksPending || isAuthorsPending) {
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

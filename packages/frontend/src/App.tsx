import { Route, Routes } from "react-router-dom";
import "./App.css";
import BooksContextProvider, { useBooksContext } from "./context/Books.context";
import { Books, Book } from "./pages";

function App() {
  const { isPending } = useBooksContext();
  if (isPending) {
    return <h4>Loading</h4>;
  }

  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<Books />} />
        <Route path='books/:title' element={<Book />} />
      </Routes>
    </div>
  );
}

export default App;

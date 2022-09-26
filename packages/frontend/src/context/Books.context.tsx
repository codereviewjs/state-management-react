import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { IBook } from "types";

interface BooksContextProps {
  books: IBook[];
  isPending: boolean;
  getBookByTitle: (title: string | undefined) => IBook | undefined;
}

const BooksContext = createContext({} as BooksContextProps);

interface BooksContextProviderProps {
  children: React.ReactNode;
}

export const useBooksContext = () => {
  const booksContext = useContext(BooksContext);

  if (!booksContext.books) {
    throw new Error("Please use useBooksContext inside BooksContextProvider");
  }

  return booksContext;
};

const BooksContextProvider = ({ children }: BooksContextProviderProps) => {
  const [books, setBooks] = useState<IBook[]>([]);
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const fetchBooks = useCallback(async () => {
    setStatus("loading");
    const booksRequest = await fetch("http://localhost:8000/v1/book");
    if (booksRequest.ok) {
      const { books }: { books: IBook[] } = await booksRequest.json();
      setBooks(books);
      setStatus("success");
    } else {
      setStatus("error");
    }
  }, []);

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  const getBookByTitle: BooksContextProps["getBookByTitle"] = (title) => {
    if (!title) return undefined;
    return books.find((book) => book.title === title);
  };

  const isPending = status === "idle" || status === "loading";

  return (
    <BooksContext.Provider value={{ books, getBookByTitle, isPending }}>
      {children}
    </BooksContext.Provider>
  );
};

export default BooksContextProvider;

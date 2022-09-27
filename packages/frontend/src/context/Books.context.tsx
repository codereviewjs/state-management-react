import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { IBook } from "types";
import { booksApi } from "../api/books.api";

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

type HttpRequestStatus = "idle" | "loading" | "success" | "error";

const BooksContextProvider = ({ children }: BooksContextProviderProps) => {
  const [books, setBooks] = useState<IBook[]>([]);
  const [status, setStatus] = useState<HttpRequestStatus>("idle");

  const fetchAllBooks = useCallback(async () => {
    try {
      setStatus("loading");
      const { books } = await booksApi.useGetAll();
      setBooks(books);
      setStatus("success");
    } catch (e) {
      setStatus("error");
    }
  }, []);
  useEffect(() => {
    fetchAllBooks();
  }, [fetchAllBooks]);

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

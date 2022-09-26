import { createContext, useContext } from "react";
import { IBook } from "types";

interface BooksContextProps {
  books: IBook[];
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
  return (
    <BooksContext.Provider value={{ books: [] }}>
      {children}
    </BooksContext.Provider>
  );
};

export default BooksContextProvider;

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { IAuthor } from "types";
import { authorsApi } from "../api/authors.api";

interface BooksContextProps {
  authors: IAuthor[];
  isPending: boolean;
  getAuthorByName: (name: string | undefined) => IAuthor | undefined;
}

const AuthorsContext = createContext({} as BooksContextProps);

interface BooksContextProviderProps {
  children: React.ReactNode;
}

export const useAuthorsContext = () => {
  const authorsContext = useContext(AuthorsContext);

  if (!authorsContext.authors) {
    throw new Error(
      "Please use useAuthorsContext inside AuthorsContextProvider"
    );
  }

  return authorsContext;
};

type HttpRequestStatus = "idle" | "loading" | "success" | "error";

const AuthorsContextProvider = ({ children }: BooksContextProviderProps) => {
  const [authors, setAuthors] = useState<IAuthor[]>([]);
  const [status, setStatus] = useState<HttpRequestStatus>("idle");

  const fetchAllAuthors = useCallback(async () => {
    try {
      setStatus("loading");
      const { authors } = await authorsApi.useGetAll();
      setAuthors(authors);
      setStatus("success");
    } catch (e) {
      setStatus("error");
    }
  }, []);
  useEffect(() => {
    fetchAllAuthors();
  }, [fetchAllAuthors]);

  const getAuthorByName: BooksContextProps["getAuthorByName"] = (name) => {
    if (!name) return undefined;
    return authors.find((author) => author.name === name);
  };

  const isPending = status === "idle" || status === "loading";

  return (
    <AuthorsContext.Provider value={{ isPending, authors, getAuthorByName }}>
      {children}
    </AuthorsContext.Provider>
  );
};

export default AuthorsContextProvider;

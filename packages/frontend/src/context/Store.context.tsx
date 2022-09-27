import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { IBook, IAuthor } from "types";
import { booksApi, authorsApi } from "../api";

interface StoreContextProps {
  books: IBook[];
  authors: IAuthor[];
  isPending: boolean;
  getBookByTitle: (title: string | undefined) => IBook | undefined;
  getAuthorByName: (name: string | undefined) => IAuthor | undefined;
}

const StoreContext = createContext({} as StoreContextProps);

interface StoreContextProviderProps {
  children: React.ReactNode;
}

export const useStoreContext = () => {
  const storeContext = useContext(StoreContext);

  if (!storeContext.books || !storeContext.authors) {
    throw new Error("Please use useStoreContext inside StoreContextProvider");
  }

  return storeContext;
};

type HttpRequestStatus = "idle" | "loading" | "success" | "error";
type StoreData<T> = {
  data: T;
  error?: string;
};

interface StoreState {
  authors: StoreData<IAuthor[]>;
  books: StoreData<IBook[]>;
  status: HttpRequestStatus;
}

const initialState: StoreState = {
  authors: {
    data: [],
  },
  books: {
    data: [],
  },
  status: "idle",
};

type GetDataRequest = {
  type: "getDataRequest";
};
type GetDataSuccess = {
  type: "getDataSuccess";
  payload: {
    authors: IAuthor[];
    books: IBook[];
  };
};
type GetDataError = {
  type: "getDataError";
  payload: {
    authors: string;
    books: string;
  };
};

type Actions = GetDataRequest | GetDataSuccess | GetDataError;

const reducer = (state: StoreState, action: Actions): StoreState => {
  switch (action.type) {
    case "getDataRequest": {
      return {
        ...state,
        status: "loading",
      };
    }
    case "getDataSuccess": {
      return {
        ...state,
        authors: {
          ...state.authors,
          data: action.payload.authors,
        },
        books: {
          ...state.books,
          data: action.payload.books,
        },
        status: "success",
      };
    }
    case "getDataError": {
      return {
        ...state,
        authors: {
          ...state.authors,
          error: action.payload.authors,
        },
        books: {
          ...state.books,
          error: action.payload.books,
        },
        status: "error",
      };
    }
  }
};

const StoreContextProvider = ({ children }: StoreContextProviderProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchData = useCallback(async () => {
    try {
      dispatch({ type: "getDataRequest" });
      const [booksResponse, authorsResponse] = await Promise.all([
        booksApi.useGetAll(),
        authorsApi.useGetAll(),
      ]);
      dispatch({
        type: "getDataSuccess",
        payload: {
          books: booksResponse.books,
          authors: authorsResponse.authors,
        },
      });
    } catch (e) {
      dispatch({
        type: "getDataError",
        payload: {
          authors: "",
          books: "",
        },
      });
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const getBookByTitle: StoreContextProps["getBookByTitle"] = (title) => {
    if (!title) return undefined;
    return state.books.data.find((book) => book.title === title);
  };

  const getAuthorByName: StoreContextProps["getAuthorByName"] = (name) => {
    if (!name) return undefined;
    return state.authors.data.find((author) => author.name === name);
  };

  const isPending = state.status === "idle" || state.status === "loading";

  return (
    <StoreContext.Provider
      value={{
        books: state.books.data,
        authors: state.authors.data,
        isPending,
        getBookByTitle,
        getAuthorByName,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
} from "react";
import { ITheme, IAuthor } from "types";
import { themeApi, authorsApi } from "../api";

interface StoreContextProps {
  themes: ITheme[];
  authors: IAuthor[];
  isPending: boolean;
  getThemeByTitle: (title: string | undefined) => ITheme | undefined;
  getAuthorByName: (name: string | undefined) => IAuthor | undefined;
}

const StoreContext = createContext({} as StoreContextProps);

interface StoreContextProviderProps {
  children: React.ReactNode;
}

export const useStoreContext = () => {
  const storeContext = useContext(StoreContext);

  if (!storeContext.themes || !storeContext.authors) {
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
  themes: StoreData<ITheme[]>;
  status: HttpRequestStatus;
}

const initialState: StoreState = {
  authors: {
    data: [],
  },
  themes: {
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
    themes: ITheme[];
  };
};
type GetDataError = {
  type: "getDataError";
  payload: {
    authors: string;
    themes: string;
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
        themes: {
          ...state.themes,
          data: action.payload.themes,
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
        themes: {
          ...state.themes,
          error: action.payload.themes,
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
      const [themeResponse, authorsResponse] = await Promise.all([
        themeApi.useGetAll(),
        authorsApi.useGetAll(),
      ]);
      dispatch({
        type: "getDataSuccess",
        payload: {
          themes: themeResponse.themes,
          authors: authorsResponse.authors,
        },
      });
    } catch (e) {
      dispatch({
        type: "getDataError",
        payload: {
          authors: "",
          themes: "",
        },
      });
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const getThemeByTitle: StoreContextProps["getThemeByTitle"] = (title) => {
    if (!title) return undefined;
    return state.themes.data.find((theme) => theme.title === title);
  };

  const getAuthorByName: StoreContextProps["getAuthorByName"] = (name) => {
    if (!name) return undefined;
    return state.authors.data.find((author) => author.name === name);
  };

  const isPending = state.status === "idle" || state.status === "loading";

  return (
    <StoreContext.Provider
      value={{
        themes: state.themes.data,
        authors: state.authors.data,
        isPending,
        getThemeByTitle,
        getAuthorByName,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;

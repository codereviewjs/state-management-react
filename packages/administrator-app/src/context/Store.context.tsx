import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
} from "react";
import { ITheme, IAuthor } from "types";
import { themeApi, authorsApi } from "../api";
import { defaultTheme } from "../constants/theme.constants";

interface StoreContextProps {
  themes: ITheme[];
  selectedTheme: ITheme;
  authors: IAuthor[];
  isPending: boolean;
  getThemeByTitle: (title: string | undefined) => ITheme | undefined;
  getAuthorByName: (name: string | undefined) => IAuthor | undefined;
  getAuthorsThemes: (author: IAuthor) => ITheme[];
  setSelectedTheme: (theme: ITheme) => void;
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
  selectedTheme: ITheme;
  authors: StoreData<IAuthor[]>;
  themes: StoreData<ITheme[]>;
  status: HttpRequestStatus;
}

const initialState: StoreState = {
  selectedTheme: defaultTheme,
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

type SetSelectedTheme = {
  type: "setSelectedTheme";
  payload: ITheme;
};

type Actions =
  | GetDataRequest
  | GetDataSuccess
  | GetDataError
  | SetSelectedTheme;

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

    case "setSelectedTheme": {
      return {
        ...state,
        selectedTheme: action.payload,
      };
    }
    default:
      return state;
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
          themes: [defaultTheme, ...themeResponse.themes],
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

  const setSelectedTheme = (theme: ITheme) => {
    dispatch({
      type: "setSelectedTheme",
      payload: theme,
    });
  };

  const getAuthorsThemes = (author: IAuthor) => {
    return author.themes
      .map((themeId) =>
        // @ts-expect-error
        state.themes.data.find((theme) => theme._id === themeId)
      )
      .filter(Boolean) as ITheme[];
  };

  const isPending = state.status === "idle" || state.status === "loading";

  return (
    <StoreContext.Provider
      value={{
        themes: state.themes.data,
        selectedTheme: state.selectedTheme,
        authors: state.authors.data,
        isPending,
        getThemeByTitle,
        getAuthorByName,
        getAuthorsThemes,
        setSelectedTheme,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;

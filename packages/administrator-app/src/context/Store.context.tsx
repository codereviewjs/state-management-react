import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
} from "react";
import { IReport, IReporter, ITheme, IUser } from "types";
import { reportsApi, reportersApi, authApi } from "../api";

interface StoreContextProps {
  user?: IUser;
  reporters: IReporter[];
  selectedTheme?: ITheme;
  reports: IReport[];
  isDataPending: boolean;
  isAuthPending: boolean;
  isLoggedIn: boolean;
  getReporterById: (id: string | undefined) => IReporter | undefined;
  getReportById: (id: string | undefined) => IReport | undefined;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const StoreContext = createContext({} as StoreContextProps);

interface StoreContextProviderProps {
  children: React.ReactNode;
}

export const useStoreContext = () => {
  const storeContext = useContext(StoreContext);

  if (!storeContext.reporters || !storeContext.reports) {
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
  selectedTheme?: ITheme;
  user: {
    data?: IUser;
    error?: string;
    isLoggedIn: boolean;
    status: HttpRequestStatus;
  };
  logout: {
    error?: string;
    status: HttpRequestStatus;
  };
  reporters: StoreData<IReporter[]>;
  reports: StoreData<IReport[]>;
  status: HttpRequestStatus;
}

const initialState: StoreState = {
  user: {
    status: "idle",
    isLoggedIn: false,
  },
  logout: {
    status: "idle",
  },
  reporters: {
    data: [],
  },
  reports: {
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
    reports: IReport[];
    reporters: IReporter[];
  };
};

type GetDataError = {
  type: "getDataError";
  payload: {
    reporters: string;
    reports: string;
  };
};

type LoginRequest = {
  type: "loginRequest";
};

type LoginSuccess = {
  type: "loginSuccess";
  payload: IUser;
};

type LoginError = {
  type: "loginError";
  payload: string;
};

type LogoutRequest = {
  type: "logoutRequest";
};

type LogoutSuccess = {
  type: "logoutSuccess";
};

type LogoutError = {
  type: "logoutError";
  payload: string;
};

type getSessionRequest = {
  type: "getSessionRequest";
};
type getSessionError = {
  type: "getSessionError";
  payload: string;
};
type getSessionSuccess = {
  type: "getSessionSuccess";
  payload: {
    user?: IUser;
    authenticated: boolean;
  };
};

type Actions =
  | GetDataRequest
  | GetDataSuccess
  | GetDataError
  | LoginRequest
  | LoginSuccess
  | LoginError
  | LogoutError
  | LogoutSuccess
  | LogoutRequest
  | getSessionRequest
  | getSessionError
  | getSessionSuccess;

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
        reporters: {
          ...state.reporters,
          data: action.payload.reporters,
        },
        reports: {
          ...state.reports,
          data: action.payload.reports,
        },
        status: "success",
      };
    }
    case "getDataError": {
      return {
        ...state,
        reporters: {
          ...state.reporters,
          error: action.payload.reporters,
        },
        reports: {
          ...state.reports,
          error: action.payload.reports,
        },
        status: "error",
      };
    }
    case "loginRequest":
    case "getSessionRequest": {
      return {
        ...state,
        user: {
          status: "loading",
          isLoggedIn: false,
        },
        logout: {
          status: "idle",
        },
      };
    }

    case "loginSuccess": {
      return {
        ...state,
        user: {
          status: "success",
          data: action.payload,
          isLoggedIn: true,
        },
      };
    }

    case "getSessionSuccess": {
      return {
        ...state,
        user: {
          data: action.payload.user,
          isLoggedIn: action.payload.authenticated,
          status: "success",
        },
      };
    }
    case "getSessionError": {
      return {
        ...state,
        user: {
          data: undefined,
          isLoggedIn: false,
          status: "error",
          error: action.payload,
        },
      };
    }

    case "loginError": {
      return {
        ...state,
        user: {
          status: "error",
          error: action.payload,
          isLoggedIn: false,
        },
      };
    }

    case "logoutRequest": {
      return {
        ...state,
        logout: {
          status: "loading",
        },
      };
    }

    case "logoutSuccess": {
      return {
        ...state,
        logout: {
          status: "success",
        },
        user: {
          data: undefined,
          status: "idle",
          isLoggedIn: false,
        },
      };
    }

    case "logoutError": {
      return {
        ...state,
        logout: {
          status: "error",
          error: action.payload,
        },
      };
    }
    default:
      return state;
  }
};

const StoreContextProvider = ({ children }: StoreContextProviderProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const getSession = async () => {
    dispatch({ type: "getSessionRequest" });
    try {
      const { user, token } = await authApi.getSession();
      const isAuthenticated = !!user;
      if (!isAuthenticated) {
        localStorage.clear();
      }

      localStorage.setItem("token", token);
      dispatch({
        type: "getSessionSuccess",
        payload: {
          user,
          authenticated: isAuthenticated,
        },
      });
      return user;
    } catch (e: any) {
      dispatch({ type: "getSessionError", payload: e.message });
      return null;
    }
  };
  const login = async (email: string, password: string) => {
    try {
      dispatch({ type: "loginRequest" });
      const { user, token } = await authApi.login({ email, password });
      localStorage.setItem("token", token);
      dispatch({ type: "loginSuccess", payload: user });
      return true;
    } catch (e: any) {
      dispatch({ type: "loginError", payload: e.message });
      return false;
    }
  };

  const logout = async () => {
    try {
      localStorage.clear();
      dispatch({ type: "logoutSuccess" });
    } catch (e: any) {
      dispatch({ type: "logoutError", payload: e.message });
    }
  };

  const fetchData = useCallback(async () => {
    try {
      const user = await getSession();
      dispatch({ type: "getDataRequest" });
      const [reportsResponse, reportersResponse] = await Promise.all([
        reportsApi.getAll(),
        reportersApi.getAll(),
      ]);
      dispatch({
        type: "getDataSuccess",
        payload: {
          reports: reportsResponse.reports,
          reporters: reportersResponse.reporters,
        },
      });
    } catch (e) {
      dispatch({
        type: "getDataError",
        payload: {
          reporters: "",
          reports: "",
        },
      });
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const getReportById: StoreContextProps["getReportById"] = (id) => {
    if (!id) return undefined;
    return state.reports.data.find((report) => report._id === id);
  };

  const getReporterById: StoreContextProps["getReporterById"] = (id) => {
    if (!id) return undefined;
    return state.reporters.data.find((reporter) => reporter._id === id);
  };

  const isDataPending = state.status === "idle" || state.status === "loading";
  const isAuthPending =
    state.user.status === "idle" || state.user.status === "loading";

  return (
    <StoreContext.Provider
      value={{
        user: state.user.data,
        isLoggedIn: state.user.isLoggedIn,
        reports: state.reports.data,
        selectedTheme: state.selectedTheme,
        reporters: state.reporters.data,
        isDataPending,
        isAuthPending,
        getReportById,
        getReporterById,
        login,
        logout,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;

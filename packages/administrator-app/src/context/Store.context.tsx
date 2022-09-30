import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
} from "react";
import { IReport, IReporter, ITheme } from "types";
import { reportsApi, reportersApi } from "../api";

interface StoreContextProps {
  reporters: IReporter[];
  selectedTheme?: ITheme;
  reports: IReport[];
  isPending: boolean;
  getReporterById: (id: string | undefined) => IReporter | undefined;
  getReportById: (id: string | undefined) => IReport | undefined;
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
  reporters: StoreData<IReporter[]>;
  reports: StoreData<IReport[]>;
  status: HttpRequestStatus;
}

const initialState: StoreState = {
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
      const [reportsResponse, reportersResponse] = await Promise.all([
        reportsApi.useGetAll(),
        reportersApi.useGetAll(),
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

  const isPending = state.status === "idle" || state.status === "loading";

  return (
    <StoreContext.Provider
      value={{
        reports: state.reports.data,
        selectedTheme: state.selectedTheme,
        reporters: state.reporters.data,
        isPending,
        getReportById,
        getReporterById,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;

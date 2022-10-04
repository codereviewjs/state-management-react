import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
} from "react";
import { IReport, IUser, Roles } from "types";
import { reportsApi, authApi } from "../../api";
import { initialState, storeReducer } from "./Store.reducer";
import { HttpRequestStatus } from "./store.types";

interface StoreContextProps {
  user?: IUser;
  reports: IReport[];
  isDataPending: boolean;
  isAuthPending: boolean;
  isLoggedIn: boolean;
  getReportById: (id: string | undefined) => IReport | undefined;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateReport: (id: string, report: IReport) => Promise<IReport>;
  deleteReport: (id: string) => Promise<void>;
}

const StoreContext = createContext({} as StoreContextProps);

interface StoreContextProviderProps {
  children: React.ReactNode;
}

export const useStoreContext = () => {
  const storeContext = useContext(StoreContext);

  if (!storeContext.reports) {
    throw new Error("Please use useStoreContext inside StoreContextProvider");
  }

  return storeContext;
};

function isPendingStatus(status: HttpRequestStatus) {
  return status === "idle" || status === "loading";
}

const StoreContextProvider = ({ children }: StoreContextProviderProps) => {
  const [state, dispatch] = useReducer(storeReducer, initialState);

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

      fetchReports();
      return true;
    } catch (e: any) {
      dispatch({ type: "loginError", payload: e.message });
      return false;
    }
  };

  const logout = async () => {
    localStorage.clear();
    dispatch({ type: "logoutSuccess" });
  };

  const fetchReports = async () => {
    try {
      dispatch({ type: "GetReportsRequest" });
      const { reports } = await reportsApi.getAuthReports();

      dispatch({
        type: "GetReportsSuccess",
        payload: reports,
      });
    } catch (e) {
      dispatch({ type: "GetReportsError", payload: "error" });
    }
  };

  const fetchData = useCallback(async () => {
    try {
      const user = await getSession();
      if (!user) return;

      const dataPerRole: Record<Roles, () => Promise<void>> = {
        [Roles.ADMIN]: async () => {},
        [Roles.REPORTER]: fetchReports,
        [Roles.USER]: async () => {},
        [Roles.GUEST]: async () => {},
      };

      await dataPerRole[user.role]?.();
    } catch (e) {
      dispatch({
        type: "getSessionError",
        payload: "error",
      });
    }
  }, []);

  const updateReport = async (id: string, report: IReport) => {
    const reportResponse = await reportsApi.update(id, report);
    await fetchReports();
    return reportResponse.report;
  };
  const deleteReport = async (id: string) => {
    await reportsApi.remove(id);
    await fetchReports();
  };

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const getReportById: StoreContextProps["getReportById"] = (id) => {
    if (!id) return undefined;
    return state.reports.data.find((report) => report._id === id);
  };

  const isDataPending =
    state.user.isLoggedIn &&
    isPendingStatus(state.reports.status) &&
    !state.reports.data.length;

  const isAuthPending = isPendingStatus(state.user.status);

  return (
    <StoreContext.Provider
      value={{
        user: state.user.data,
        isLoggedIn: state.user.isLoggedIn,
        reports: state.reports.data,
        isDataPending,
        isAuthPending,
        getReportById,
        login,
        logout,
        deleteReport,
        updateReport,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;

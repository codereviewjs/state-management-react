import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
} from "react";
import { ICreateReport, IReport, IUser, Roles } from "types";
import { reportsApi, authApi, reportersApi } from "../../api";
import { initialState, storeReducer } from "./Store.reducer";
import { StoreState } from "./store.types";

interface StoreContextProps {
  user: StoreState["user"];
  reports: StoreState["reports"];
  reporters: StoreState["reporters"];
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateReport: (id: string, report: IReport) => Promise<IReport>;
  deleteReport: (id: string) => Promise<void>;
  createReport: (report: ICreateReport) => Promise<IReport>;
  deleteReporter: (id: string) => Promise<void>;
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

const StoreContextProvider = ({ children }: StoreContextProviderProps) => {
  const [state, dispatch] = useReducer(storeReducer, initialState);

  const fetchReports = async (type: "auth" | "all" = "auth") => {
    try {
      dispatch({ type: "GetReportsRequest" });
      const fetchReportsType: Record<
        typeof type,
        () => Promise<{ reports: IReport[] }>
      > = {
        auth: reportsApi.getAuthReports,
        all: reportsApi.getAll,
      };

      const { reports } = await fetchReportsType[type]();

      dispatch({
        type: "GetReportsSuccess",
        payload: reports,
      });
    } catch (e) {
      dispatch({ type: "GetReportsError", payload: "error" });
    }
  };

  const fetchReporters = async () => {
    try {
      dispatch({ type: "GetReportersRequest" });
      const { reporters } = await reportersApi.getAll();

      dispatch({
        type: "GetReportersSuccess",
        payload: reporters,
      });
    } catch (e) {
      dispatch({ type: "GetReportersError", payload: "error" });
    }
  };

  const fetchAdminData = () => {
    return Promise.all([fetchReporters(), fetchReports("all")]);
  };

  const dataPerRole: Record<Roles, () => Promise<any>> = {
    [Roles.ADMIN]: fetchAdminData,
    [Roles.REPORTER]: fetchReports,
    [Roles.USER]: async () => {},
    [Roles.GUEST]: async () => {},
  };

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

      await dataPerRole[user.role]();
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

  const fetchData = useCallback(async () => {
    try {
      const user = await getSession();
      if (!user) return;

      await dataPerRole[user.role]?.();
    } catch (e) {
      dispatch({
        type: "getSessionError",
        payload: "error",
      });
    }
  }, []);

  const createReport = async (report: ICreateReport) => {
    const reportResponse = await reportsApi.create(report);
    await fetchReports();
    return reportResponse.report;
  };
  const updateReport = async (id: string, report: IReport) => {
    const reportResponse = await reportsApi.update(id, report);
    await fetchReports();
    return reportResponse.report;
  };
  const deleteReport = async (id: string) => {
    await reportsApi.remove(id);
    await fetchReports();
  };

  const deleteReporter = async (id: string) => {
    await reportersApi.remove(id);
    await fetchAdminData();
  };

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <StoreContext.Provider
      value={{
        user: state.user,
        reports: state.reports,
        reporters: state.reporters,
        login,
        logout,
        deleteReport,
        updateReport,
        createReport,
        deleteReporter,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;

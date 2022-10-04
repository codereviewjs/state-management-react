import { AuthSliceActions, authSliceReducer } from "./auth.slice";
import { ReportSliceActions, reportsSliceReducer } from "./reports.slice";
import { StoreState } from "./store.types";

type Actions = AuthSliceActions | ReportSliceActions;

export const initialState: StoreState = {
  user: {
    data: undefined,
    status: "idle",
    isLoggedIn: false,
  },
  reports: {
    data: [],
    status: "idle",
  },
};

export const storeReducer = (
  state: StoreState,
  action: Actions
): StoreState => {
  return (
    authSliceReducer(state, action as AuthSliceActions) ||
    reportsSliceReducer(state, action as ReportSliceActions) ||
    state
  );
};

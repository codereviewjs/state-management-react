import { AuthSliceActions, authSliceReducer } from "./auth.slice";
import {
  ReportersSliceActions,
  ReportersSliceReducer,
} from "./reporters.slice";
import { ReportSliceActions, reportsSliceReducer } from "./reports.slice";
import { StoreState } from "./store.types";

export type Actions =
  | AuthSliceActions
  | ReportSliceActions
  | ReportersSliceActions;

export const initialState: StoreState = {
  auth: {
    data: undefined,
    status: "idle",
    isLoggedIn: false,
  },
  reports: {
    data: [],
    status: "idle",
  },
  reporters: {
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
    ReportersSliceReducer(state, action as ReportersSliceActions) ||
    state
  );
};

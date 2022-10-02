import { AuthSliceActions, authSliceReducer } from "./auth.slice";
import { MetadataSliceActions, metadataSliceReducer } from "./metadata.slice";
import { ReportSliceActions, reportsSliceReducer } from "./reports.slice";
import { StoreState } from "./store.types";

type Actions = AuthSliceActions | ReportSliceActions | MetadataSliceActions;

export const initialState: StoreState = {
  user: {
    data: undefined,
    status: "idle",
    isLoggedIn: false,
  },
  metadata: {
    data: undefined,
    status: "idle",
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
    metadataSliceReducer(state, action as MetadataSliceActions) ||
    reportsSliceReducer(state, action as ReportSliceActions) ||
    state
  );
};

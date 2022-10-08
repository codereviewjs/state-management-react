import { IReportDTO } from "types";
import { StoreState } from "./store.types";

type GetReportsRequest = {
  type: "GetReportsRequest";
};
type GetReportsSuccess = {
  type: "GetReportsSuccess";
  payload: IReportDTO[];
};
type GetReportsError = {
  type: "GetReportsError";
  payload: string;
};

export type ReportSliceActions =
  | GetReportsError
  | GetReportsRequest
  | GetReportsSuccess;

export const reportsSliceReducer = (
  state: StoreState,
  action: ReportSliceActions
): StoreState | undefined => {
  switch (action.type) {
    case "GetReportsRequest": {
      return {
        ...state,
        reports: {
          ...state.reports,
          status: "loading",
        },
      };
    }
    case "GetReportsSuccess": {
      return {
        ...state,
        reports: {
          data: action.payload,
          status: "success",
        },
      };
    }
    case "GetReportsError": {
      return {
        ...state,
        reports: {
          ...state.reports,
          status: "error",
          error: action.payload,
        },
      };
    }
    default: {
      return undefined;
    }
  }
};

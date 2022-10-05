import { IReporter } from "types";
import { StoreState } from "./store.types";

type GetReportersRequest = {
  type: "GetReportersRequest";
};
type GetReportersSuccess = {
  type: "GetReportersSuccess";
  payload: IReporter[];
};
type GetReportersError = {
  type: "GetReportersError";
  payload: string;
};

export type ReportersSliceActions =
  | GetReportersError
  | GetReportersRequest
  | GetReportersSuccess;

export const ReportersSliceReducer = (
  state: StoreState,
  action: ReportersSliceActions
): StoreState | undefined => {
  switch (action.type) {
    case "GetReportersRequest": {
      return {
        ...state,
        reporters: {
          ...state.reporters,
          status: "loading",
        },
      };
    }
    case "GetReportersSuccess": {
      return {
        ...state,
        reporters: {
          data: action.payload,
          status: "success",
        },
      };
    }
    case "GetReportersError": {
      return {
        ...state,
        reporters: {
          ...state.reporters,
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

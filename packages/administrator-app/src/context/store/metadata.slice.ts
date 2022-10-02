import { IMetadata } from "types";
import { StoreState } from "./store.types";

type GetMetadataRequest = {
  type: "GetMetadataRequest";
};
type GetMetadataSuccess = {
  type: "GetMetadataSuccess";
  payload: IMetadata;
};
type GetMetadataError = {
  type: "GetMetadataError";
  payload: string;
};

export type MetadataSliceActions =
  | GetMetadataError
  | GetMetadataRequest
  | GetMetadataSuccess;

export const metadataSliceReducer = (
  state: StoreState,
  action: MetadataSliceActions
): StoreState | undefined => {
  switch (action.type) {
    case "GetMetadataRequest": {
      return {
        ...state,
        metadata: {
          ...state.metadata,
          status: "loading",
        },
      };
    }
    case "GetMetadataSuccess": {
      return {
        ...state,
        metadata: {
          data: action.payload,
          status: "success",
        },
      };
    }
    case "GetMetadataError": {
      return {
        ...state,
        metadata: {
          ...state.metadata,
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

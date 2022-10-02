import { ITheme, IUser, IReporter, IReport, IMetadata } from "types";

export type HttpRequestStatus = "idle" | "loading" | "success" | "error";

type StoreData<T> = {
  data: T;
  error?: string;
  status: HttpRequestStatus;
};

export interface StoreState {
  user: StoreData<IUser | undefined> & {
    isLoggedIn: boolean;
  };
  reports: StoreData<IReport[]>;
  metadata: StoreData<IMetadata | undefined>;
}
import { IReport, IReporter, IAuthWithoutSensitiveData } from "types";

export type HttpRequestStatus = "idle" | "loading" | "success" | "error";

type StoreData<T> = {
  data: T;
  error?: string;
  status: HttpRequestStatus;
};

export interface StoreState {
  auth: StoreData<IAuthWithoutSensitiveData | undefined> & {
    isLoggedIn: boolean;
  };
  reports: StoreData<IReport[]>;
  reporters: StoreData<IReporter[]>;
}

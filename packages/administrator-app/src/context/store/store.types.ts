import { IAuthDTO, IReporterDTO, IReportDTO } from "types";

export type HttpRequestStatus = "idle" | "loading" | "success" | "error";

type StoreData<T> = {
  data: T;
  error?: string;
  status: HttpRequestStatus;
};

export interface StoreState {
  auth: StoreData<IAuthDTO | undefined> & {
    isLoggedIn: boolean;
  };
  reports: StoreData<IReportDTO[]>;
  reporters: StoreData<IReporterDTO[]>;
}

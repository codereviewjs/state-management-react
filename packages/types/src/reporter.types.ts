import { IAuth } from "./auth.types";
import { IReport } from "./report.types";
import { IUser } from "./user.types";

export interface IReporter {
  _id?: string;
  reports: IReport[];
  auth: IAuth;
  user?: IUser;
}

export interface IReporterPure extends Omit<IReporter, "auth" | "user"> {}

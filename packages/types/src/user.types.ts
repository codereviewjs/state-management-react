import { IAuth } from "./auth.types";
import { IReport } from "./report.types";
import { IReporter } from "./reporter.types";

export interface IUser {
  _id?: string;
  auth: IAuth;
  likedReports: IReport[];
  savedReporters: IReporter[];
}

export interface IUserDTO extends Omit<IUser, "auth"> {}

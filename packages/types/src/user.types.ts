import { IAuth } from "./auth.types";
import { IReport, IReportDTO } from "./report.types";
import { IReporter, IReporterDTO } from "./reporter.types";

export interface IUser {
  _id?: string;
  auth: IAuth;
  likedReports: IReport[];
  savedReporters: IReporter[];
}

export interface IUserDTO extends Pick<IUser, "_id"> {
  likedReports: IReportDTO[];
  savedReporters: IReporterDTO[];
}

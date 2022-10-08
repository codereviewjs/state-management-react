import { IReportDTO } from "./report.types";
import { IReporterDTO } from "./reporter.types";

export interface IUserDTO {
  _id?: string;
  likedReports: IReportDTO[];
  savedReporters: IReporterDTO[];
}

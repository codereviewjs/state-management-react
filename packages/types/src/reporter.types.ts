import { IReportDTO } from "./report.types";

export interface IReporterDTO {
  _id?: string;
  name: string;
  email: string;
  reports: IReportDTO[];
}

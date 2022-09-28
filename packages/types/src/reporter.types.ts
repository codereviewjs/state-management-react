import { IReport } from "./report.types";

export interface IReporter {
  _id?: string;
  name: string;
  reports: IReport[];
}

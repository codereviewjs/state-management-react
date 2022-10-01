import { IReport } from "./report.types";

export interface IReporter {
  _id?: string;
  firstName: string;
  lastName: string;
  email: string;
  reports: IReport[];
}

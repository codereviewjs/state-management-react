import { IReporterDTO } from "types";
import { IAuth } from "../models/auth.model";
import { IReporter } from "../models/reporter.model";
import { reportUtils } from "./report.utils";

function reporterToReporterDTO(reporter: IReporter): IReporterDTO {
  const auth = reporter?.auth as IAuth;
  const hasAuth = !!auth;

  return {
    reports: reportUtils.reportsToReportsDTO(reporter.reports, null),
    _id: reporter._id?.toString(),
    name: hasAuth ? `${auth.firstName} ${auth.lastName}` : "",
    email: hasAuth ? auth.email : "",
  };
}

function reportersToReportersDTO(reporters: IReporter[]): IReporterDTO[] {
  return reporters.map(reporterToReporterDTO);
}

export const reporterUtils = {
  reporterToReporterDTO,
  reportersToReportersDTO,
};

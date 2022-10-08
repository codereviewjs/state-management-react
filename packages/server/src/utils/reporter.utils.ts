import { IReporter, IReporterDTO } from "types";

function reporterToReporterDTO(reporter: IReporter): IReporterDTO {
  const hasAuth = !!reporter.auth;

  return {
    reports: reporter.reports,
    _id: reporter._id,
    name: hasAuth ? `${reporter.auth.firstName} ${reporter.auth.lastName}` : "",
    email: hasAuth ? reporter.auth.email : "",
  };
}

function reportersToReportersDTO(reporters: IReporter[]): IReporterDTO[] {
  return reporters.map(reporterToReporterDTO);
}

export const reporterUtils = {
  reporterToReporterDTO,
  reportersToReportersDTO,
};

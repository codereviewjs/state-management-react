import { IReporter, IReporterDTO } from "types";

function reporterToReporterDTO(reporter: IReporter): IReporterDTO {
  return {
    reports: reporter.reports,
    _id: reporter._id,
  };
}

function reportersToReportersDTO(reporters: IReporter[]): IReporterDTO[] {
  return reporters.map(reporterToReporterDTO);
}

export const reporterUtils = {
  reporterToReporterDTO,
  reportersToReportersDTO,
};

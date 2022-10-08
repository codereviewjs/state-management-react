import { IReport, IReportDTO } from "types";

function reportToReportDTO(report: IReport): IReportDTO {
  return {
    _id: report._id,
    title: report.title,
    description: report.description,
    date: report.date,
    category: report.category,
    reporterId: report.reporter?._id || "",
    reporterName: report.reporter?.auth
      ? `${report.reporter.auth.firstName} ${report.reporter.auth.lastName}`
      : "",
  };
}

function reportsToReportsDTO(reports: IReport[]): IReportDTO[] {
  return reports.map(reportToReportDTO);
}

export const reportUtils = {
  reportToReportDTO,
  reportsToReportsDTO,
};

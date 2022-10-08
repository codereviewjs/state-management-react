import { PopulatedDoc } from "mongoose";
import { IReportDTO } from "types";
import { IAuth } from "../models/auth.model";
import { IReport } from "../models/report.model";
import { IUser } from "../models/user.model";

function reportToReportDTO(
  report: IReport,
  user: PopulatedDoc<IUser> | null
): IReportDTO {
  const auth = report.reporter.auth as IAuth;

  return {
    _id: report._id,
    title: report.title,
    description: report.description,
    date: report.date,
    category: report.category,
    reporterId: report.reporter?._id?.toString() || "",
    reporterName: auth ? `${auth.firstName} ${auth.lastName}` : "",
    likesCount: report?.likes?.length || 0,
    isLiked: user
      ? report.likes.some((likedReport) =>
          likedReport?._id?.equals(user?._id?.toString() || "")
        )
      : false,
  };
}

function reportsToReportsDTO(
  reports: IReport[],
  user: PopulatedDoc<IUser> | null
): IReportDTO[] {
  return reports.map((r) => reportToReportDTO(r, user));
}

export const reportUtils = {
  reportToReportDTO,
  reportsToReportsDTO,
};

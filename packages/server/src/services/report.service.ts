import { ICreateReportDTO } from "types";
import { IAuth } from "../models/auth.model";
import ReportModel, { IReport } from "../models/report.model";
import { IReporter } from "../models/reporter.model";
import { HttpException } from "../utils/HttpException";
import { reporterService } from "./reporter.service";
import { userService } from "./user.service";

type WithOptions = { withReporter?: boolean; withLikes?: boolean };

function withOptions(options?: WithOptions) {
  const docs = [];
  if (options?.withReporter) {
    docs.push({ path: "reporter", populate: { path: "auth" } });
  }
  if (options?.withLikes) {
    docs.push({ path: "likes", populate: { path: "auth" } });
  }

  return docs;
}

async function getAll(options?: WithOptions) {
  return ReportModel.find().populate(withOptions(options));
}

async function getOne(id: string, options?: WithOptions) {
  if (!id) throw new HttpException(400, "missing id");

  return ReportModel.findById(id).populate(withOptions(options));
}

async function getReportsOfAuth(auth: IAuth, options?: WithOptions) {
  if (!auth) throw new HttpException(401, "not authenticated");
  const reporter = await reporterService.getByAuth(auth);

  return ReportModel.find({ reporter: reporter?._id }).populate(
    withOptions(options)
  );
}

async function updateReportsOfAuth(
  reportId: string,
  updatedReport: IReport,
  auth: IAuth,
  options?: WithOptions
) {
  if (!auth) throw new HttpException(401, "not authenticated");

  return ReportModel.findOneAndUpdate(
    { reporter: auth.reporter, _id: reportId },
    {
      title: updatedReport.title,
      description: updatedReport.description,
      category: updatedReport.category,
    },
    { new: true }
  ).populate(withOptions(options));
}

async function deleteById(id: string) {
  if (!id) throw new HttpException(400, "missing id");

  await ReportModel.findByIdAndDelete(id);
}

async function create(report: ICreateReportDTO, reporter: IReporter) {
  if (!report || !reporter) throw new HttpException(400, "missing id");

  return ReportModel.create({
    ...report,
    date: new Date(),
    reporter: reporter._id,
  });
}

async function like(reportId: string, auth: IAuth, options?: WithOptions) {
  if (!auth) throw new HttpException(403, "not authorized");
  if (!like) throw new HttpException(400, "missing report id");

  const report = await getOne(reportId, {
    withReporter: true,
  });
  if (!report) throw new HttpException(404, "report not found");

  const user = await userService.getOne(auth.user?._id?.toString() || "");
  if (!user) throw new HttpException(404, "user not found");

  if (
    report.likes.some((likeUserId) => user._id.equals(likeUserId?._id || ""))
  ) {
    report.likes = report.likes.filter(
      (likeUserId) => !user._id.equals(likeUserId?._id || "")
    );

    user.likedReports = user.likedReports?.filter(
      // @ts-expect-error
      (report) => !report.equals(reportId)
    );
  } else {
    report.likes.push(user);
    user.likedReports.push(report as IReport);
  }

  await report.save();
  await user.save();

  return report.populate(withOptions(options));
}

export const reportService = {
  getAll,
  getOne,
  getReportsOfAuth,
  updateReportsOfAuth,
  deleteById,
  create,
  like,
};

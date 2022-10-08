import { Query } from "mongoose";
import { IAuth, ICreateReportDTO, IReport, IReporter } from "types";
import ReportModel from "../models/report.model";
import { HttpException } from "../utils/HttpException";
import { reporterService } from "./reporter.service";

type WithReporter = { withReporter?: boolean };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function withReporter<T extends Query<any, any, any, any>>(
  doc: T,
  options?: WithReporter
): T {
  if (options?.withReporter) {
    return doc.populate({ path: "reporter", populate: { path: "auth" } });
  }

  return doc;
}

async function getAll(options?: WithReporter) {
  return withReporter(ReportModel.find(), options);
}

async function getOne(id: string, options?: WithReporter) {
  if (!id) throw new HttpException(400, "missing id");
  return withReporter(ReportModel.findById(id), options);
}

async function getReportsOfAuth(auth: IAuth, options?: WithReporter) {
  if (!auth) throw new HttpException(401, "not authenticated");
  const reporter = await reporterService.getByAuth(auth);

  return withReporter(ReportModel.find({ reporter: reporter?._id }), options);
}

async function updateReportsOfAuth(
  updatedReport: IReport,
  auth: IAuth,
  options?: WithReporter
) {
  if (!auth) throw new HttpException(401, "not authenticated");

  return withReporter(
    ReportModel.findOneAndUpdate(
      { "reporter.auth": auth._id, _id: updatedReport._id },
      updatedReport
    ),
    options
  );
}

async function deleteById(id: string) {
  if (!id) throw new HttpException(400, "missing id");

  return ReportModel.findByIdAndDelete(id);
}

async function create(report: ICreateReportDTO, reporter: IReporter) {
  if (!report || !reporter) throw new HttpException(400, "missing id");

  return ReportModel.create({
    ...report,
    date: new Date(),
    reporter: reporter._id,
  });
}

export const reportService = {
  getAll,
  getOne,
  getReportsOfAuth,
  updateReportsOfAuth,
  deleteById,
  create,
};

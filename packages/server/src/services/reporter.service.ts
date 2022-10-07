import type { Query } from "mongoose";
import { IAuth, IReport, IReporter } from "types";
import ReporterModule from "../models/reporter.module";
import { HttpException } from "../utils/HttpException";

type WithReporters = { withReports?: boolean };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function withReporters<T extends Query<any, any, any, any>>(
  doc: T,
  options?: WithReporters
): T {
  if (options?.withReports) {
    return doc.populate("reports");
  }

  return doc;
}

function getAll(options?: WithReporters) {
  return withReporters(ReporterModule.find(), options);
}

function getByAuth(auth: IAuth, options?: WithReporters) {
  if (!auth) throw new HttpException(400, "not allowed");

  return withReporters(
    ReporterModule.findOne({
      auth: auth._id,
    }),
    options
  );
}

function getById(id: string, options?: WithReporters) {
  if (!id) throw new HttpException(400, "missing id");

  return withReporters(ReporterModule.findById(id), options);
}

function deleteById(id: string) {
  if (!id) throw new HttpException(400, "missing id");

  return ReporterModule.findByIdAndDelete(id);
}

function addReport(reporterId: IReporter, report: IReport) {
  return ReporterModule.findByIdAndUpdate(reporterId, {
    $push: report,
  });
}

export const reporterService = {
  getByAuth,
  addReport,
  getById,
  getAll,
  deleteById,
};

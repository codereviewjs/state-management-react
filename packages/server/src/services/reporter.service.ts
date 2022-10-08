import type { Query } from "mongoose";
import { IAuth } from "../models/auth.model";
import { IReport } from "../models/report.model";
import ReporterModule, { IReporter } from "../models/reporter.model";
import { HttpException } from "../utils/HttpException";

type WithOptions = {
  withReports?: boolean;
  withAuth?: boolean;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function withOptions<T extends Query<any, any, any, any>>(
  doc: T,
  options?: WithOptions
) {
  const docs = [];
  if (options?.withAuth) {
    docs.push("auth");
  }
  if (options?.withReports) {
    docs.push("reports");
  }

  if (docs.length) {
    return doc.populate(docs);
  }

  return doc;
}

function getAll(options?: WithOptions) {
  return withOptions(ReporterModule.find(), options);
}

function getByAuth(auth: IAuth, options?: WithOptions) {
  if (!auth) throw new HttpException(400, "not allowed");

  return withOptions(
    ReporterModule.findOne({
      auth: auth._id,
    }),
    options
  );
}

function getById(id: string, options?: WithOptions) {
  if (!id) throw new HttpException(400, "missing id");

  return withOptions(ReporterModule.findById(id), options);
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

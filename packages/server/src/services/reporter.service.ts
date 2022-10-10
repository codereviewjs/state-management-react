import AuthModel, { IAuth } from "../models/auth.model";
import { IReport } from "../models/report.model";
import ReporterModule from "../models/reporter.model";
import { HttpException } from "../utils/HttpException";

type WithOptions = {
  withReports?: boolean;
  withAuth?: boolean;
};

function withOptions(options?: WithOptions) {
  const docs = [];
  if (options?.withAuth) {
    docs.push("auth");
  }
  if (options?.withReports) {
    docs.push("reports");
  }

  return docs;
}

function getAll(options?: WithOptions) {
  return ReporterModule.find().populate(withOptions(options));
}

function getByAuth(auth: IAuth, options?: WithOptions) {
  if (!auth) throw new HttpException(400, "not allowed");
  return ReporterModule.findOne({
    auth: auth._id,
  }).populate(withOptions(options));
}

function getById(id: string, options?: WithOptions) {
  if (!id) throw new HttpException(400, "missing id");

  return ReporterModule.findById(id).populate(withOptions(options));
}

function deleteById(id: string) {
  if (!id) throw new HttpException(400, "missing id");

  return ReporterModule.findByIdAndDelete(id);
}

function addReport(reporterId: string, report: IReport) {
  return ReporterModule.findByIdAndUpdate(reporterId, {
    $push: {
      reports: report,
    },
  });
}

async function create(auth: IAuth) {
  if (auth.reporter) throw new HttpException(400, "already a reporter");
  const reporter = await ReporterModule.create({
    auth,
    reports: [],
  });

  await AuthModel.findByIdAndUpdate(auth._id, { reporter });

  return reporter;
}

export const reporterService = {
  getByAuth,
  addReport,
  getById,
  getAll,
  deleteById,
  create,
};

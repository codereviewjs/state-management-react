import { IAuth, ICreateReportDTO, IReport, IReporter } from "types";
import ReportModel from "../models/report.model";
import { HttpException } from "../utils/HttpException";
import { reporterService } from "./reporter.service";

async function getAll() {
  return ReportModel.find();
}

async function getOne(id: string) {
  if (!id) throw new HttpException(400, "missing id");
  return ReportModel.findById(id);
}

async function getReportsOfAuth(auth: IAuth) {
  if (!auth) throw new HttpException(401, "not authenticated");
  const reporter = await reporterService.getByAuth(auth);

  return ReportModel.find({ reporter: reporter?._id });
}

async function updateReportsOfAuth(updatedReport: IReport, auth: IAuth) {
  if (!auth) throw new HttpException(401, "not authenticated");

  return ReportModel.findOneAndUpdate(
    { "reporter.auth": auth._id, _id: updatedReport._id },
    updatedReport
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

import { Response, Request, NextFunction } from "express";
import { ICreateReportDTO } from "types";
import { IAuth } from "../models/auth.model";
import { IReport } from "../models/report.model";
import { reportService } from "../services/report.service";
import { reporterService } from "../services/reporter.service";
import { HttpException } from "../utils/HttpException";
import { reportUtils } from "../utils/report.utils";

async function getAll(_: Request, res: Response, next: NextFunction) {
  const auth: IAuth = res.locals.auth;
  console.log(auth, "ATH");

  try {
    const reports = await reportService.getAll({
      withReporter: true,
    });
    return res.json({
      reports: reportUtils.reportsToReportsDTO(reports, auth?.user || null),
    });
  } catch (e) {
    next(e);
  }
}

async function getOne(req: Request, res: Response, next: NextFunction) {
  const auth: IAuth = res.locals.auth;
  try {
    const report = await reportService.getOne(req.params.id, {
      withReporter: true,
    });

    if (!report) throw new HttpException(404, "report not found");

    res.json({
      report: reportUtils.reportToReportDTO(report, auth?.user || null),
    });
  } catch (e) {
    next(e);
  }
}

async function getReportsByAuth(_: Request, res: Response, next: NextFunction) {
  try {
    const auth: IAuth = res.locals.auth;
    const authReports = await reportService.getReportsOfAuth(auth);

    return res.json({
      reports: reportUtils.reportsToReportsDTO(authReports, auth.user) || [],
    });
  } catch (e) {
    next(e);
  }
}

async function update(req: Request, res: Response, next: NextFunction) {
  try {
    const { report } = req.body as { report: IReport };
    const auth: IAuth = res.locals.auth;

    await reportService.updateReportsOfAuth(report, auth);
    return res.json({
      report: reportUtils.reportToReportDTO(report, auth.user),
    });
  } catch (e) {
    next(e);
  }
}

async function like(req: Request, res: Response, next: NextFunction) {
  try {
    req.params.id;
    const auth: IAuth = res.locals.auth;

    const updatedReport = await reportService.like(req.params.id, auth, {
      withReporter: true,
    });

    res.json({
      report: reportUtils.reportToReportDTO(updatedReport, auth.user),
    });
  } catch (e) {
    next(e);
  }
}

async function remove(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params as { id: string };
    await reportService.deleteById(id);
    return res.json({ message: "deleted report", reportId: id });
  } catch (e) {
    next(e);
  }
}

async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const { report } = req.body as { report: ICreateReportDTO };
    // should be validation ....

    const auth: IAuth = res.locals.auth;
    const reporter = await reporterService.getByAuth(auth);

    if (!auth || !reporter) {
      return res.status(400).json({ error: "Not valid operation" });
    }

    const createdReport = await reportService.create(report, reporter);

    await reporterService.addReport(reporter, createdReport);
    return res.status(201).json({
      report: reportUtils.reportToReportDTO(createdReport, auth.user),
    });
  } catch (e) {
    next(e);
  }
}

export const reportController = {
  getAll,
  getOne,
  getReportsByAuth,
  update,
  remove,
  create,
  like,
};

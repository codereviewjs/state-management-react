import { Response, Request, NextFunction } from "express";
import { IAuth, ICreateReportDTO, IReport } from "types";
import { reportService } from "../services/report.service";
import { reporterService } from "../services/reporter.service";

async function getAll(_: Request, res: Response, next: NextFunction) {
  try {
    const reports = await reportService.getAll();
    return res.json({ reports });
  } catch (e) {
    next(e);
  }
}

async function getOne(req: Request, res: Response, next: NextFunction) {
  try {
    const report = await reportService.getOne(req.params.id);
    return res.json({ report });
  } catch (e) {
    next(e);
  }
}

async function getReportsByAuth(_: Request, res: Response, next: NextFunction) {
  try {
    const auth: IAuth = res.locals.auth;
    const authReports = await reportService.getReportsOfAuth(auth);
    console.log(authReports);

    return res.json({ reports: authReports || [] });
  } catch (e) {
    next(e);
  }
}

async function update(req: Request, res: Response, next: NextFunction) {
  try {
    const { report } = req.body as { report: IReport };
    const auth: IAuth = res.locals.auth;
    await reportService.updateReportsOfAuth(report, auth);
    return res.json({ report });
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

    const response: { report: IReport } = {
      report: {
        category: createdReport.category,
        date: createdReport.date,
        description: createdReport.description,
        reporter: createdReport.reporter,
        title: createdReport.title,
        _id: createdReport._id,
      },
    };

    await reporterService.addReport(reporter, createdReport);
    return res.status(201).json(response);
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
};

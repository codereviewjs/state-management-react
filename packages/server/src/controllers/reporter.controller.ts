import { Response, Request, NextFunction } from "express";
import { reporterService } from "../services/reporter.service";
import { HttpException } from "../utils/HttpException";
import { reporterUtils } from "../utils/reporter.utils";

async function getAll(_: Request, res: Response, next: NextFunction) {
  try {
    const reportersDoc = await reporterService.getAll({
      withReports: true,
    });

    return res.json({
      reporters: reporterUtils.reportersToReportersDTO(reportersDoc),
    });
  } catch (e) {
    next(e);
  }
}

async function getOne(req: Request, res: Response, next: NextFunction) {
  try {
    const reporterDoc = await reporterService.getById(req.params.id);
    if (!reporterDoc) throw new HttpException(404, "not found");

    return res.json({
      reporter: reporterUtils.reporterToReporterDTO(reporterDoc),
    });
  } catch (e) {
    next(e);
  }
}

async function remove(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params as { id: string };
    await reporterService.deleteById(id);
    return res.json({ message: "deleted report", reportId: id });
  } catch (e) {
    next(e);
  }
}

export const reporterController = {
  getAll,
  getOne,
  remove,
};

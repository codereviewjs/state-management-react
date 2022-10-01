import { Response, Request } from "express";
import { ReportModule } from "../models";

async function getAll(req: Request, res: Response) {
  const reports = await ReportModule.find().populate("reporter");
  return res.json({ reports });
}

async function getOne(req: Request, res: Response) {
  const report = await ReportModule.findById(req.params.id).populate(
    "reporter"
  );
  return res.json({ report });
}

export const reportController = {
  getAll,
  getOne,
};

import { Response, Request } from "express";
import { ReporterModule } from "../models";

async function getAll(req: Request, res: Response) {
  const reporters = await ReporterModule.find();
  return res.json({ reporters });
}

async function getOne(req: Request, res: Response) {
  const reporter = await ReporterModule.findById(req.params.id).populate(
    "reports"
  );
  return res.json({ reporter });
}

export const reporterController = {
  getAll,
  getOne,
};

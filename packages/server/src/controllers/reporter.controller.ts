import { Response, Request } from "express";
import { IAuth } from "types";
import { ReporterModule } from "../models";

async function getAll(req: Request, res: Response) {
  const reporters = await ReporterModule.find().populate("reports");
  return res.json({ reporters });
}

async function getOne(req: Request, res: Response) {
  const reporter = await ReporterModule.findById(req.params.id).populate(
    "reports"
  );
  return res.json({ reporter });
}

async function remove(req: Request, res: Response) {
  try {
    const { id } = req.params as { id: string };

    const auth: IAuth = res.locals.auth;
    if (!auth) {
      return res.status(400).json({ error: "Not valid operation" });
    }

    const reporter = await ReporterModule.findById(id);

    await reporter?.remove();

    return res.json({ message: "deleted report", reportId: id });
  } catch (e: any) {
    return res.status(500).json({ error: e.message });
  }
}

export const reporterController = {
  getAll,
  getOne,
  remove,
};

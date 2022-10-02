import { Response, Request } from "express";
import { IAuth } from "types";
import { ReporterModule, ReportModule } from "../models";

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

async function getReportsByAuth(req: Request, res: Response) {
  try {
    
    const user: IAuth = res.locals.user;
    const authReports = await ReporterModule.findById(user.reporter?._id).populate('reports')
    return res.json({ reports: authReports?.reports || [] });
  }catch(e: any){
    return res.status(500).json({error: e.message})
  }
}

export const reportController = {
  getAll,
  getOne,
  getReportsByAuth
};

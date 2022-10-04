import { Response, Request } from "express";
import { IAuth, ICreateReport, IReport } from "types";
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
    const authReports = await ReporterModule.findById(
      user.reporter?._id
    ).populate("reports");
    return res.json({ reports: authReports?.reports || [] });
  } catch (e: any) {
    return res.status(500).json({ error: e.message });
  }
}

async function update(req: Request, res: Response) {
  try {
    const { report } = req.body as { report: IReport };
    const user: IAuth = res.locals.user;
    if (!user) {
      return res.status(400).json({ error: "Not valid operation" });
    }

    await ReportModule.findOneAndUpdate(
      { _id: report._id, reporter: user.reporter?._id },
      report
    );
    return res.json({ report });
  } catch (e: any) {
    return res.status(500).json({ error: e.message });
  }
}

async function remove(req: Request, res: Response) {
  try {
    const { id } = req.params as { id: string };
    const user: IAuth = res.locals.user;
    if (!user) {
      return res.status(400).json({ error: "Not valid operation" });
    }

    await ReportModule.findOneAndDelete({
      _id: id,
      reporter: user.reporter?._id,
    });
    return res.json({ message: "deleted report", reportId: id });
  } catch (e: any) {
    return res.status(500).json({ error: e.message });
  }
}

async function create(req: Request, res: Response) {
  const { report } = req.body as { report: ICreateReport };
  const user: IAuth = res.locals.user;
  if (!user) {
    return res.status(400).json({ error: "Not valid operation" });
  }

  // should be validation ....

  const createdReport = await ReportModule.create({
    ...report,
    date: new Date(),
    reporter: user.reporter?._id,
  });

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
  console.log("HERE?");

  const reporter = await ReporterModule.findById(user.reporter?._id);
  console.log(reporter?.firstName);

  reporter?.reports.push(response.report);
  await reporter?.save();

  return res.status(201).json(response);
}

export const reportController = {
  getAll,
  getOne,
  getReportsByAuth,
  update,
  remove,
  create,
};

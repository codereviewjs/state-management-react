import { disconnect } from "mongoose";
import { Roles } from "types";
import { connect } from "../database";
import AuthModel from "../models/auth.model";
import ReportModel from "../models/report.model";
import ReporterModel from "../models/reporter.model";
import UserModule from "../models/user.model";
import { reports, users } from "./data";

async function cleanAll() {
  await AuthModel.remove();
  console.log("Removed auth");
  await ReportModel.remove();
  console.log("Removed reports");
  await ReporterModel.remove();
  console.log("Removed reporters");
}

async function seed() {
  connect(async (err) => {
    try {
      if (err) throw err;
      await cleanAll();

      const authDoc = await AuthModel.insertMany(users);
      console.log("Created auth users");

      for (const auth of authDoc) {
        const userDoc = await UserModule.create({
          auth,
        });
        auth.user = userDoc;
        if (auth.role === Roles.REPORTER) {
          const reporterReports = reports.filter(
            // @ts-expect-error
            (report) => report.reporter?.auth?.email === auth.email
          );

          const reporterDoc = await ReporterModel.create({
            reports: [],
            auth,
          });

          const reportsDoc = await ReportModel.insertMany(
            reporterReports.map((report) => ({
              ...report,
              reporter: reporterDoc,
            }))
          );

          auth.reporter = reporterDoc;

          reporterDoc.reports.push(...reportsDoc);
          await reporterDoc.save();
          console.log("Created reporter", auth.firstName + " " + auth.lastName);
          console.log("reporters reports length", reporterDoc.reports.length);
        }

        await auth.save();
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      console.log(e.message);
    } finally {
      await disconnect();
    }
  });
}

seed();

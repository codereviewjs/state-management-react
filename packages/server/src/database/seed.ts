import { disconnect } from "mongoose";
import { IAuth, Roles } from "types";
import { connect } from "../database";
import AuthModel from "../models/auth.model";
import ReportModel from "../models/report.model";
import ReporterModule from "../models/reporter.module";
import UserModule from "../models/user.model";
import { authUtils } from "../utils/auth.utils";
import { reports, users } from "./data";

async function cleanAll() {
  await AuthModel.remove();
  console.log("Removed auth");
  await ReportModel.remove();
  console.log("Removed reports");
  await ReporterModule.remove();
  console.log("Removed reporters");
}

async function seed() {
  connect(async (err) => {
    try {
      if (err) throw err;
      await cleanAll();

      const authUsers: IAuth[] = [];

      for (const user of users) {
        user.password = await authUtils.hashPassword(user.password);
        authUsers.push(user);
      }

      const authDoc = await AuthModel.insertMany(authUsers);
      console.log("Created auth users");

      for (const auth of authDoc) {
        const userDoc = await UserModule.create({
          auth,
        });
        console.log("Created user", auth.firstName + " " + auth.lastName);
        if (auth.role === Roles.REPORTER) {
          const reporterReports = reports.filter(
            (report) => report.reporter.auth.email === auth.email
          );

          const reporterDoc = await ReporterModule.create({
            reports: [],
            auth,
            user: userDoc,
          });

          const reportsDoc = await ReportModel.insertMany(
            reporterReports.map((report) => ({
              ...report,
              reporter: reporterDoc,
            }))
          );

          reporterDoc.reports.push(...reportsDoc);
          await reporterDoc.save();
          console.log("Created reporter", auth.firstName + " " + auth.lastName);
          console.log("reporters reports length", reporterDoc.reports.length);
        }
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

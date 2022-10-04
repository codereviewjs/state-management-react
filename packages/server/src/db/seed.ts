import { disconnect } from "mongoose";
import { connect } from "../config/mongo";
import { AuthModule, ReportModule, ReporterModule } from "../models";
import { reporters, reports, users } from "./data";

async function cleanAll() {
  await AuthModule.remove();
  console.log("Removed auth");
  await ReportModule.remove();
  console.log("Removed reports");
  await ReporterModule.remove();
  console.log("Removed reporters");
}

async function seed() {
  connect(async (err) => {
    try {
      if (err) throw err;
      await cleanAll();

      await ReporterModule.insertMany(reporters);
      console.log("Created reporters");

      for (const report of reports) {
        const reporter = await ReporterModule.findOne({
          email: report.reporter.email,
        });

        if (!reporter) {
          continue;
        }

        const reportDoc = await ReportModule.create({
          ...report,
          reporter,
        });

        reporter.reports.push(reportDoc);
        await reporter.save();
        console.log("Reporters reports", reporter.reports.length);
      }
      console.log("Created reports");

      for (const user of users) {
        console.log(user.password);

        if (!user.admin) {
          const reportersDoc = await ReporterModule.findOne({
            email: user.email,
          });
          if (reportersDoc) {
            user.reporter = reportersDoc;
          }
        }

        await AuthModule.create(user);
      }
      console.log("Created users");
    } catch (e: any) {
      console.log(e.message);
    } finally {
      await disconnect();
    }
  });
}

seed();

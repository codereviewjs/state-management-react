import { disconnect } from "mongoose";
import { IReporter } from "types";
import { connect } from "../config/mongo";
import {
  AuthModule,
  MetadataModule,
  ReportModule,
  ReporterModule,
} from "../models";
import { metadata, reporters, reports, user } from "./data";

async function cleanAll() {
  await AuthModule.remove();
  console.log("Removed auth");
  await MetadataModule.remove();
  console.log("Removed metadata");
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

      await AuthModule.create(user);
      console.log("Created user");

      await MetadataModule.create(metadata);
      console.log("Created metadata");

      await ReporterModule.insertMany(reporters);
      console.log("Created reporters");

      for (const report of reports) {
        const reporter = await ReporterModule.findOne({
          name: report.reporter.name,
        });

        if (!reporter) {
          continue;
        }

        console.log("Reporter", reporter.name);
        console.log("Reporter", report.title);
        const reportDoc = await ReportModule.create({
          ...report,
          reporter,
        });

        reporter.reports.push(reportDoc);
        await reporter.save();
        console.log("Reporters reports", reporter.reports.length);
      }
      console.log("Created reports");
    } catch (e: any) {
      console.log(e.message);
    } finally {
      await disconnect();
    }
  });
}

seed();

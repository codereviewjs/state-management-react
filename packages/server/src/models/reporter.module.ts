import mongoose from "mongoose";
import { IReport, IReporter } from "types";
import AuthModel from "./auth.model";
import ReportModel from "./report.model";
import UserModel from "./user.model";
const { Schema } = mongoose;

const reporterSchema = new Schema<IReporter>({
  reports: [
    {
      type: Schema.Types.ObjectId,
      ref: "Report",
    },
  ],
  auth: {
    type: Schema.Types.ObjectId,
    ref: "Auth",
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

reporterSchema.pre("remove", async function () {
  console.log(this.reports.map((report: IReport) => report._id));

  await ReportModel.deleteMany({
    _id: { $in: this.reports.map((report: IReport) => report._id) },
  });

  await AuthModel.findByIdAndDelete(this.auth._id);

  if (this.user) {
    await UserModel.findByIdAndDelete(this.user._id);
  }
});

const ReporterModule = mongoose.model("Reporter", reporterSchema);
export default ReporterModule;

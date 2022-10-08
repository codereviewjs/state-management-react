import mongoose from "mongoose";
import AuthModel, { IAuth } from "./auth.model";
import ReportModel, { IReport } from "./report.model";
const { Schema } = mongoose;

export interface IReporter {
  _id?: mongoose.Types.ObjectId;
  reports: IReport[];
  auth: mongoose.PopulatedDoc<IAuth>;
}

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
});

reporterSchema.pre("remove", async function () {
  await ReportModel.deleteMany({
    _id: { $in: this.reports.map((report: IReport) => report._id) },
  });

  // TODO - need to check
  if (this.auth) {
    await AuthModel.findByIdAndDelete(this.auth._id);
  }
});

const ReporterModel = mongoose.model("Reporter", reporterSchema);
export default ReporterModel;

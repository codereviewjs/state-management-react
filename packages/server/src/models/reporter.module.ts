import mongoose from "mongoose";
import { IReport, IReporter } from "types";
import { AuthModule, ReportModule } from ".";
const { Schema } = mongoose;

const reporterSchema = new Schema<IReporter>({
  firstName: String,
  lastName: String,
  email: String,
  reports: [
    {
      type: Schema.Types.ObjectId,
      ref: "Report",
    },
  ],
});

reporterSchema.pre("remove", async function () {
  console.log(this.reports.map((report: IReport) => report._id));

  await ReportModule.deleteMany({
    _id: { $in: this.reports.map((report: IReport) => report._id) },
  });

  await AuthModule.findOneAndDelete({ reporter: this._id });
});

const Reporter = mongoose.model("Reporter", reporterSchema);
export default Reporter;

import mongoose from "mongoose";
import { IReport, IReporter } from "types";
import { AuthModule, ReportModule, UserModule } from ".";
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

  await ReportModule.deleteMany({
    _id: { $in: this.reports.map((report: IReport) => report._id) },
  });

  await AuthModule.findByIdAndDelete(this.auth._id);

  if (this.user) {
    await UserModule.findByIdAndDelete(this.user._id);
  }
});

const Reporter = mongoose.model("Reporter", reporterSchema);
export default Reporter;

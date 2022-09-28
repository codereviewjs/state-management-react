import mongoose from "mongoose";
import { IReporter } from "types";
const { Schema } = mongoose;

const reporterSchema = new Schema<IReporter>({
  name: String,
  reports: [
    {
      type: Schema.Types.ObjectId,
      ref: "Report",
    },
  ],
});

const Reporter = mongoose.model("Reporter", reporterSchema);
export default Reporter;

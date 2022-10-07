import mongoose from "mongoose";
import { IReport, Categories } from "types";
const { Schema } = mongoose;

const reportSchema = new Schema<IReport>({
  title: String,
  description: String,
  date: Date,
  category: {
    type: String,
    enum: [
      Categories.FOOD,
      Categories.POLITICS,
      Categories.SCIENCE,
      Categories.SPORTS,
      Categories.WEATHER,
    ],
  },
  reporter: {
    type: Schema.Types.ObjectId,
    ref: "Reporter",
  },
});

const ReportModel = mongoose.model("Report", reportSchema);
export default ReportModel;

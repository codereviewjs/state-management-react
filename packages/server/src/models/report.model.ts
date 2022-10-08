import mongoose from "mongoose";
import { Categories } from "types";
import { IReporter } from "./reporter.model";
import { IUser } from "./user.model";
const { Schema } = mongoose;

export interface IReport {
  _id?: string;
  title: string;
  description: string;
  date: Date;
  category: Categories;
  reporter: IReporter;
  likes: mongoose.PopulatedDoc<IUser>[];
}

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
  likes: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
      default: [],
    },
  ],
});

const ReportModel = mongoose.model("Report", reportSchema);
export default ReportModel;

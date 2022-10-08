import mongoose from "mongoose";
import { IAuth } from "./auth.model";
import { IReport } from "./report.model";
import { IReporter } from "./reporter.model";
const { Schema } = mongoose;

export interface IUser {
  _id?: mongoose.Types.ObjectId;
  auth: IAuth;
  likedReports: mongoose.PopulatedDoc<IReport>[];
  savedReporters: mongoose.PopulatedDoc<IReporter>[];
}

const userSchema = new Schema<IUser>({
  auth: {
    type: Schema.Types.ObjectId,
    ref: "Auth",
  },
  likedReports: [
    {
      type: Schema.Types.ObjectId,
      ref: "Report",
      default: [],
    },
  ],
  savedReporters: [
    {
      type: Schema.Types.ObjectId,
      ref: "Reporter",
      default: [],
    },
  ],
});

const UserModel = mongoose.model("User", userSchema);
export default UserModel;

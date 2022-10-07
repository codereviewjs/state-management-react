import mongoose from "mongoose";
import { IUser } from "types";
const { Schema } = mongoose;

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

const User = mongoose.model("User", userSchema);
export default User;

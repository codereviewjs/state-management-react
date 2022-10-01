import { IAuth } from "types";
import mongoose from "mongoose";

const { Schema } = mongoose;

const authSchema = new Schema<IAuth>({
  email: String,
  password: String,
  isLoggedIn: {
    type: Boolean,
    default: false,
  },
  admin: {
    type: Boolean,
    default: false,
  },
  reporter: {
    type: Schema.Types.ObjectId,
    ref: "Reporter",
  },
});

const Auth = mongoose.model("Auth", authSchema);
export default Auth;

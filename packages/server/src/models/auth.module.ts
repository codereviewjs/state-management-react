import { IAuth } from "types";
import bcrypt from "bcrypt";
import mongoose from "mongoose";
import type { Model, Schema } from "mongoose";

interface IAuthDocument extends IAuth, Document {}

interface IAuthModel extends Model<IAuthDocument> {
  login: (email: string, password: string) => Promise<IAuthDocument>;
}

const authSchema: Schema<IAuthDocument> = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  isLoggedIn: {
    type: Boolean,
    default: false,
  },
  admin: {
    type: Boolean,
    default: false,
  },
  reporter: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Reporter",
  },
});

authSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

authSchema.statics.login = async function (email: string, password: string) {
  const user = await this.findOne({ email });
  if (user) {
    const isAuthenticated = await bcrypt.compare(password, user.password);
    if (isAuthenticated) {
      return user;
    }
  }

  throw Error("not valid credentials");
};

const Auth = mongoose.model<IAuthDocument, IAuthModel>("Auth", authSchema);
export default Auth;

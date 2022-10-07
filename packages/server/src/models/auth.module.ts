import { IAuth, Roles } from "types";
import mongoose from "mongoose";
import type { Model, Schema } from "mongoose";
import { authUtils } from "../utils";

interface IAuthDocument extends IAuth, Document {}

interface IAuthModel extends Model<IAuthDocument> {
  login: (email: string, password: string) => Promise<IAuthDocument>;
}

const authSchema: Schema<IAuthDocument> = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    unique: true,
  },
  lastName: {
    type: String,
    required: true,
    unique: true,
  },
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
  role: {
    type: String,
    enum: Roles,
    default: Roles.GUEST,
  },
});

authSchema.pre("save", async function (next) {
  this.password = await authUtils.hashPassword(this.password);
  next();
});

authSchema.statics.login = async function (email: string, password: string) {
  const user = await this.findOne({ email });
  if (user) {
    const isAuthenticated = await authUtils.comparePassword(
      password,
      user.password
    );
    console.log("isAuthenticated", isAuthenticated);

    if (isAuthenticated) {
      return user;
    }
  }

  throw Error("not valid credentials");
};

const Auth = mongoose.model<IAuthDocument, IAuthModel>("Auth", authSchema);
export default Auth;

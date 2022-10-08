import { Roles } from "types";
import mongoose, { PopulatedDoc } from "mongoose";
import type { Model, Schema } from "mongoose";
import { authUtils } from "../utils/auth.utils";
import { HttpException } from "../utils/HttpException";
import { IReporter } from "./reporter.model";
import { IUser } from "./user.model";

export interface IAuth {
  _id?: mongoose.Types.ObjectId;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  role: Roles;
  user?: PopulatedDoc<IUser>;
  reporter?: PopulatedDoc<IReporter>;
}

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
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  reporter: {
    type: mongoose.Types.ObjectId,
    ref: "Reporter",
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

    if (isAuthenticated) {
      return user;
    }
  }

  throw new HttpException(409, "not valid credentials");
};

const AuthModel = mongoose.model<IAuthDocument, IAuthModel>("Auth", authSchema);
export default AuthModel;

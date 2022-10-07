import { IReporterPure } from "./reporter.types";
import { IUserPure } from "./user.types";

export enum Roles {
  ADMIN = "ADMIN",
  REPORTER = "REPORTER",
  USER = "USER",
  GUEST = "GUEST",
}

export interface IAuth {
  _id?: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  role: Roles;
}

export interface IAuthWithoutSensitiveData extends Omit<IAuth, "password"> {}

export interface AuthResponse {
  auth: IAuthWithoutSensitiveData;
  token: string;
  reporter?: IReporterPure;
  user?: IUserPure;
}

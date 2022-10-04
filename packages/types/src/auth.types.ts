import { IReporter } from "./reporter.types";

export enum Roles {
  ADMIN = "ADMIN",
  REPORTER = "REPORTER",
  USER = "USER",
  GUEST = "GUEST",
}

export interface IAuth {
  _id?: string;
  email: string;
  password: string;
  role: Roles;
  admin?: boolean;
  reporter?: IReporter;
}

export interface IUser
  extends Pick<IAuth, "admin" | "email" | "reporter" | "_id" | "role"> {}

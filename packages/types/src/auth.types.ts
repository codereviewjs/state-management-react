import { IReporter } from "./reporter.types";

export interface IAuth {
  _id?: string;
  email: string;
  password: string;
  admin?: boolean;
  reporter?: IReporter;
}

export interface IUser
  extends Pick<IAuth, "admin" | "email" | "reporter" | "_id"> {}

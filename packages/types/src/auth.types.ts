import { IReporter } from "./reporter.types";

export interface IAuth {
  email: string;
  password: string;
  isLoggedIn: boolean;
  admin?: boolean;
  reporter?: IReporter;
}

export interface IUser extends Pick<IAuth, "admin" | "email" | "reporter"> {}

import { IReporterDTO } from "./reporter.types";
import { IUserDTO } from "./user.types";

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

export interface IAuthDTO extends Omit<IAuth, "password"> {}

export interface AuthResponse {
  auth: IAuthDTO;
  token: string;
  reporter?: IReporterDTO;
  user?: IUserDTO;
}

import { IReporterDTO } from "./reporter.types";
import { IUserDTO } from "./user.types";

export enum Roles {
  ADMIN = "ADMIN",
  REPORTER = "REPORTER",
  USER = "USER",
  GUEST = "GUEST",
}

export interface IAuthDTO {
  _id?: string;
  email: string;
  firstName: string;
  lastName: string;
  role: Roles;
}

export interface ICreateAuthDTO {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  role: Roles;
}

export interface AuthResponse {
  auth: IAuthDTO;
  token: string;
  reporter?: IReporterDTO;
  user?: IUserDTO;
}

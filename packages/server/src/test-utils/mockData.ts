import { Roles, Categories } from "types";
import { IAuth } from "../models/auth.model";
import { IReport } from "../models/report.model";
import { IReporter } from "../models/reporter.model";
import { IUser } from "../models/user.model";

export const AUTH: IAuth = {
  email: "test@gmail.com",
  password: "password",
  firstName: "something1",
  lastName: "lorem1",
  role: Roles.ADMIN,
  _id: undefined,
};

export const AUTH_REPORTER: IAuth = {
  email: "test2@gmail.com",
  password: "password2",
  firstName: "something",
  lastName: "lorem",
  role: Roles.REPORTER,
  _id: undefined,
};

export const AUTH_ADMIN: IAuth = {
  email: "test233@gmail.com",
  password: "password233",
  firstName: "something33",
  lastName: "lorem33",
  role: Roles.ADMIN,
  _id: undefined,
};

export const REPORT: IReport = {
  category: Categories.FOOD,
  date: new Date("02, 02, 2020"),
  description: "description",
  likes: [],
  reporter: {} as IReporter,
  title: "title",
};

export const REPORTER: IReporter = {
  auth: AUTH_REPORTER,
  reports: [REPORT],
};

AUTH_REPORTER.reporter = REPORTER;

export const USER: IUser = {
  savedReporters: [],
  auth: AUTH,
  likedReports: [],
  _id: undefined,
};

AUTH.user = USER;

export const USER_REPORTER: IUser = {
  savedReporters: [],
  auth: AUTH_REPORTER,
  likedReports: [],
  _id: undefined,
};

AUTH_REPORTER.user = USER_REPORTER;

AUTH.user = USER;

export const TOKEN = "1234";

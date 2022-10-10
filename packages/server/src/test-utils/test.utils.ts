import request from "supertest";
import { ICreateReportDTO } from "types";
import app from "../app";
import { IAuth } from "../models/auth.model";
import { IReporter } from "../models/reporter.model";
import { authService } from "../services/auth.service";
import { reportService } from "../services/report.service";
import { reporterService } from "../services/reporter.service";
import { AUTH, AUTH_REPORTER, REPORT } from "./mockData";

async function login(auth = AUTH) {
  const response = await request(app)
    .post("/v1/auth/login")
    .send({ email: auth.email, password: auth.password });

  return {
    token: response.body.token,
    auth: response.body.auth,
    user: response.body.user,
    reporter: response.body.reporter,
    authHeader: ["Authorization", `Bearer ${response.body.token}`] as const,
  };
}

async function createAuth(auth = AUTH) {
  return authService.create({
    email: auth.email,
    firstName: auth.firstName,
    lastName: auth.lastName,
    password: auth.password,
    role: auth.role,
  });
}

async function createReport(reporter: IReporter, report: ICreateReportDTO) {
  const createdReport = await reportService.create(report, reporter);

  await reporterService.addReport(
    reporter._id?.toString() || "",
    createdReport
  );

  return createdReport;
}

async function createReporter(auth: IAuth) {
  return reporterService.create(auth);
}

async function createData(auth = AUTH_REPORTER, report = REPORT) {
  const createdAuth = await createAuth(auth);
  const createdReporter = await createReporter(createdAuth);
  const createdReport = await createReport(createdReporter, report);

  return {
    report: createdReport,
    auth: createdAuth,
    reporter: createdReporter,
  };
}

export const testUtils = {
  login,
  createAuth,
  createData,
  createReport,
  createReporter,
};

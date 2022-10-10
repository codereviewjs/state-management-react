import request from "supertest";
import { Categories, ICreateReportDTO } from "types";
import app from "../../app";
import { IReport } from "../../models/report.model";
import { IReporter } from "../../models/reporter.model";
import { connectDB, dropDB } from "../../test-utils/database";
import { AUTH, AUTH_REPORTER } from "../../test-utils/mockData";
import { testUtils } from "../../test-utils/test.utils";

let report: IReport;
let reporter: IReporter;
const mainRoute = "/v1/report";

beforeAll(async () => {
  await connectDB();
  const data = await testUtils.createData();

  report = data.report as IReport;
  reporter = data.reporter as IReporter;
});

afterAll(async () => {
  await dropDB();
});

describe("Report integration", () => {
  describe(`GET ${mainRoute}`, () => {
    it("should get all", async () => {
      const response = await request(app).get(mainRoute);

      expect(response.status).toBe(200);
      expect(response.body.reports).toHaveLength(1);
    });
  });

  describe(`GET ${mainRoute}/:id`, () => {
    it("should get report by id", async () => {
      const response = await request(app).get(`${mainRoute}/${report?._id}`);

      expect(response.status).toBe(200);
      expect(response.body.report._id).toEqual(report?._id?.toString());
    });
  });

  describe(`GET ${mainRoute}/authReports`, () => {
    it("should get report only of auth user - with reports", async () => {
      const { authHeader } = await testUtils.login(AUTH_REPORTER);

      const response = await request(app)
        .get(`${mainRoute}/authReports`)
        .set(...authHeader);

      expect(response.status).toBe(200);
      expect(response.body.reports).toHaveLength(1);
    });

    it("should get report only of auth user - without reports", async () => {
      await testUtils.createAuth(AUTH);
      const { authHeader } = await testUtils.login(AUTH);
      expect(authHeader).not.toBeUndefined();

      const response = await request(app)
        .get(`${mainRoute}/authReports`)
        .set(...authHeader);

      expect(response.status).toBe(200);
      expect(response.body.reports).toHaveLength(0);
    });
  });

  describe(`PUT ${mainRoute}/:id`, () => {
    it("should update report by id", async () => {
      const UPDATED_TITLE = "NEW TITLE";
      const { authHeader } = await testUtils.login(AUTH_REPORTER);

      const response = await request(app)
        .put(`${mainRoute}/${report._id?.toString()}`)
        .send({
          report: {
            ...report,
            title: UPDATED_TITLE,
            _id: report._id?.toString(),
          },
        })
        .set(...authHeader);

      expect(response.status).toBe(200);
      expect(response.body.report.title).toBe(UPDATED_TITLE);
    });
  });

  describe(`PUT ${mainRoute}/like/:id`, () => {
    it("should like and unlike a report", async () => {
      const { authHeader } = await testUtils.login(AUTH_REPORTER);

      const firstResponse = await request(app)
        .put(`${mainRoute}/like/${report._id?.toString()}`)
        .send()
        .set(...authHeader);

      expect(firstResponse.status).toBe(200);
      expect(firstResponse.body.report.likesCount).toBe(1);

      const secondResponse = await request(app)
        .put(`${mainRoute}/like/${report._id?.toString()}`)
        .send()
        .set(...authHeader);

      expect(secondResponse.status).toBe(200);
      expect(secondResponse.body.report.likesCount).toBe(0);
    });
  });

  describe(`POST ${mainRoute}/`, () => {
    it("should create new report", async () => {
      const newReport: ICreateReportDTO = {
        category: Categories.POLITICS,
        title: "new report",
        description: "new description",
      };

      const { authHeader } = await testUtils.login(AUTH_REPORTER);

      const response = await request(app)
        .post(mainRoute)
        .send({
          report: newReport,
        })
        .set(...authHeader);

      expect(response.status).toBe(201);
      expect(response.body.report.title).toBe(newReport.title);
      expect(response.body.report.category).toBe(newReport.category);
      expect(response.body.report.description).toBe(newReport.description);
      expect(response.body.report.reporterId).toBe(reporter._id?.toString());
    });
  });

  describe(`DELETE ${mainRoute}/:id`, () => {
    it("should delete report", async () => {
      const getAllResponse1 = await request(app).get(mainRoute);
      expect(getAllResponse1.body.reports).toHaveLength(2);

      const { authHeader } = await testUtils.login(AUTH_REPORTER);

      const deleteResponse = await request(app)
        .delete(`${mainRoute}/${report._id?.toString()}`)
        .set(...authHeader);

      expect(deleteResponse.status).toBe(200);

      const getAllResponse2 = await request(app).get(mainRoute);
      expect(getAllResponse2.body.reports).toHaveLength(1);
    });
  });
});

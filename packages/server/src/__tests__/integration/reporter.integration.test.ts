import request from "supertest";
import app from "../../app";
import { IReporter } from "../../models/reporter.model";
import { connectDB, dropDB } from "../../test-utils/database";
import { AUTH_ADMIN, AUTH_REPORTER } from "../../test-utils/mockData";
import { testUtils } from "../../test-utils/test.utils";

let reporter: IReporter;

const mainRoute = "/v1/reporter";

beforeAll(async () => {
  await connectDB();
  const createdData = await testUtils.createData();

  reporter = createdData.reporter;
});

afterAll(async () => {
  await dropDB();
});

describe("Reporter integration", () => {
  describe(`GET ${mainRoute}`, () => {
    it("should get all", async () => {
      const response = await request(app).get(mainRoute);

      expect(response.status).toBe(200);
      expect(response.body.reporters).toHaveLength(1);
    });
  });

  describe(`GET ${mainRoute}/:id`, () => {
    it("should get reporter by id", async () => {
      const response = await request(app).get(`${mainRoute}/${reporter?._id}`);

      expect(response.status).toBe(200);
      expect(response.body.reporter._id).toEqual(reporter?._id?.toString());
    });
  });

  describe(`DELETE ${mainRoute}/:id`, () => {
    it("should get 403 when not admin", async () => {
      const { authHeader } = await testUtils.login(AUTH_REPORTER);

      const deleteResponse = await request(app)
        .delete(`${mainRoute}/${reporter._id?.toString()}`)
        .set(...authHeader);

      expect(deleteResponse.status).toBe(403);
    });

    it("should delete report", async () => {
      const getAllResponse1 = await request(app).get(mainRoute);
      expect(getAllResponse1.body.reporters).toHaveLength(1);

      await testUtils.createAuth(AUTH_ADMIN);

      const { authHeader } = await testUtils.login(AUTH_ADMIN);

      const deleteResponse = await request(app)
        .delete(`${mainRoute}/${reporter._id?.toString()}`)
        .set(...authHeader);

      expect(deleteResponse.status).toBe(200);

      const getAllResponse2 = await request(app).get(mainRoute);
      expect(getAllResponse2.body.reporters).toHaveLength(0);
    });
  });
});

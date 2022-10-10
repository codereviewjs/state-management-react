import request from "supertest";
import app from "../../app";
import { IAuth } from "../../models/auth.model";
import { connectDB, dropDB } from "../../test-utils/database";
import { AUTH } from "../../test-utils/mockData";
import { testUtils } from "../../test-utils/test.utils";

let auth: IAuth;

const mainRoute = "/v1/user";

beforeAll(async () => {
  await connectDB();
  const data = await testUtils.createData(AUTH);
  auth = data.auth;
});

afterAll(async () => {
  await dropDB();
});

describe("User integration", () => {
  describe(`GET ${mainRoute}/me`, () => {
    it("should get all", async () => {
      const { authHeader } = await testUtils.login(AUTH);
      const response = await request(app)
        .get(`${mainRoute}/me`)
        .set(...authHeader);

      expect(response.status).toBe(200);
      expect(response.body.user._id).toBe(auth.user?._id?.toString());
    });
  });
});

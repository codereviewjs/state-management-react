import request from "supertest";
import { ICreateAuthDTO, Roles } from "types";
import app from "../../app";
import { connectDB, dropDB } from "../../test-utils/database";
import { AUTH } from "../../test-utils/mockData";
import { testUtils } from "../../test-utils/test.utils";

const mainRoute = `/v1/auth`;

beforeAll(async () => {
  await connectDB();
  await testUtils.createAuth();
});

afterAll(async () => {
  await dropDB();
});

describe("Auth integration", () => {
  describe(`POST ${mainRoute}`, () => {
    it("should create", async () => {
      const requestBody: ICreateAuthDTO = {
        email: "test123@email.com",
        password: "Password123123!",
        firstName: "John",
        lastName: "Due",
        role: Roles.USER,
      };

      const response = await request(app)
        .post(mainRoute)
        .send({ auth: requestBody });

      expect(response.status).toBe(201);
    });
  });

  describe(`POST ${mainRoute}/login`, () => {
    it("should login", async () => {
      const response = await request(app)
        .post(`${mainRoute}/login`)
        .send({ email: AUTH.email, password: AUTH.password });

      expect(response.status).toBe(200);
    });
  });
});

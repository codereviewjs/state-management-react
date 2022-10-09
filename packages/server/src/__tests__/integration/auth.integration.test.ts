import request from "supertest";
import { ICreateAuthDTO, Roles } from "types";
import app from "../../app";
import { connectDB, dropCollections, dropDB } from "../../test-utils/database";
import { AUTH } from "../../test-utils/mockData";

beforeAll(async () => {
  await connectDB();
});

beforeEach(async () => {
  await dropCollections();
});

afterAll(async () => {
  await dropDB();
});

describe("Auth integration", () => {
  describe("POST /v1/auth", () => {
    it("should create", async () => {
      const requestBody: ICreateAuthDTO = {
        email: "test123@email.com",
        password: "Password123123!",
        firstName: "John",
        lastName: "Due",
        role: Roles.USER,
      };

      const response = await request(app)
        .post("/v1/auth/")
        .send({ auth: requestBody });

      expect(response.status).toBe(201);
    });
  });

  describe("POST /v1/auth/login", () => {
    it("should login", async () => {
      const response = await request(app)
        .post("/v1/auth/login")
        .send({ email: AUTH.email, password: AUTH.password });

      expect(response.status).toBe(200);
    });
  });
});

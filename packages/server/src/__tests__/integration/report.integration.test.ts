import request from "supertest";
import app from "../../app";
import { connectDB, dropCollections, dropDB } from "../../test-utils/database";
import { testLogin } from "../../test-utils/testLogin";

beforeAll(async () => {
  await connectDB();
});

beforeEach(async () => {
  await dropCollections();
});

afterAll(async () => {
  await dropDB();
});

describe("Report integration", () => {
  describe("GET /v1/report", () => {
    it("should get all", async () => {
      const { token } = await testLogin();
      const response = await request(app)
        .get("/v1/report")
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(200);
    });
  });
});

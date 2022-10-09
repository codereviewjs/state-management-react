import request from "supertest";
import { AuthResponse } from "types";
import app from "../app";
import { AUTH } from "./mockData";

export async function testLogin() {
  const response = await request(app)
    .post("/v1/auth/login")
    .send({ email: AUTH.email, password: AUTH.password });

  return {
    token: response.body.token,
    auth: response.body.auth,
    user: response.body.user,
    reporter: response.body.reporter,
  } as AuthResponse;
}

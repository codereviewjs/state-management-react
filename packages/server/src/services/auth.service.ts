import AuthModel from "../models/auth.model";
import { authUtils } from "../utils/auth.utils";
import { HttpException } from "../utils/HttpException";

async function login(email: string, password: string) {
  if (!email || !password)
    throw new HttpException(400, "not valid credentials");

  const auth = await AuthModel.login(email, password);
  const token = authUtils.createToken(auth._id || "");

  return { auth, token };
}

export const authService = {
  login,
};

import { ICreateAuthDTO } from "types";
import AuthModel from "../models/auth.model";
import UserModel from "../models/user.model";
import { authUtils } from "../utils/auth.utils";
import { HttpException } from "../utils/HttpException";

async function login(email: string, password: string) {
  if (!email || !password)
    throw new HttpException(400, "not valid credentials");

  const auth = await AuthModel.login(email, password);
  const token = authUtils.createToken(auth._id?.toString() || "");

  return { auth, token };
}

async function create(auth: ICreateAuthDTO) {
  // validations on auth....
  const userDoc = new UserModel();

  const authDoc = new AuthModel({
    ...auth,
    user: userDoc,
  });

  userDoc.auth = authDoc;

  await userDoc.save();
  await authDoc.save();

  return authDoc;
}
export const authService = {
  login,
  create,
};

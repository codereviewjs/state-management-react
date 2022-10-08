import { IAuth } from "../models/auth.model";
import UserModel from "../models/user.model";
import { HttpException } from "../utils/HttpException";

function getByAuth(auth: IAuth) {
  if (!auth) throw new HttpException(403, "not allowed");
  return UserModel.findOne({ auth: auth._id }).populate("likedReports");
}

function getOne(id: string) {
  if (!id) throw new HttpException(403, "not allowed");
  return UserModel.findById(id);
}

export const userService = {
  getByAuth,
  getOne,
};

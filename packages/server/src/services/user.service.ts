import { Query } from "mongoose";
import { IAuth } from "types";
import UserModel from "../models/user.model";
import { HttpException } from "../utils/HttpException";

type WithOptions = {
  withLikedReports?: boolean;
  withSavedReporters?: boolean;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function withOptions<T extends Query<any, any, any, any>>(
  doc: T,
  options?: WithOptions
) {
  const docs = [];
  if (options?.withLikedReports) {
    docs.push("likedReports");
  }
  if (options?.withSavedReporters) {
    docs.push("savedReporters");
  }

  if (docs.length) {
    return doc.populate(docs);
  }

  return doc;
}
function getByAuth(auth: IAuth, options?: WithOptions) {
  if (!auth) throw new HttpException(403, "not allowed");
  return withOptions(UserModel.findOne({ auth: auth._id }), options);
}

export const userService = {
  getByAuth,
};

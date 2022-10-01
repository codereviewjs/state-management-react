import bcrypt from "bcrypt";
import { Request } from "express";
import jwt from "jsonwebtoken";
import { IAuth, IUser } from "types";

async function hashPassword(password: string) {
  const salt = await bcrypt.genSalt();
  return await bcrypt.hash(password, salt);
}

async function comparePassword(password: string, encryptedPassword: string) {
  return bcrypt.compare(password, encryptedPassword);
}

async function verifyJwt(
  token: string,
  callback?: (
    err: jwt.VerifyErrors | null,
    options: jwt.VerifyCallback<jwt.JwtPayload | string>
  ) => void
) {
  const secret = process.env.SECRET;
  if (!secret) throw new Error("Please add secret env var");

  // @ts-expect-error
  return jwt.verify(token, secret, callback);
}

function getTokenFromRequest(req: Request) {
  const authHeader = req.headers["authorization"];
  return authHeader && authHeader.split(" ")[1];
}

function createToken(id: string) {
  const secret = process.env.SECRET;
  if (!secret) throw new Error("Please add secret env var");

  return jwt.sign({ id }, secret, {
    expiresIn: "1h",
  });
}

function parseAuthToUser(auth: IAuth): IUser {
  return {
    _id: auth._id,
    email: auth.email,
    admin: auth.admin,
    reporter: auth.reporter,
  };
}

export const authUtils = {
  hashPassword,
  comparePassword,
  verifyJwt,
  getTokenFromRequest,
  parseAuthToUser,
  createToken,
};

import bcrypt from "bcrypt";
import { Request } from "express";
import jwt from "jsonwebtoken";
import { AuthResponse, IAuth, IAuthDTO, Roles } from "types";
import ReporterModel from "../models/reporter.model";
import UserModule from "../models/user.model";

async function hashPassword(password: string) {
  const salt = await bcrypt.genSalt();
  const hash = await bcrypt.hashSync(password, salt);
  return hash;
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

function authToAuthDTO(auth: IAuth): IAuthDTO {
  return {
    email: auth.email,
    firstName: auth.firstName,
    lastName: auth.lastName,
    role: auth.role,
  };
}

export const authUtils = {
  hashPassword,
  comparePassword,
  verifyJwt,
  getTokenFromRequest,
  authToAuthDTO,
  createToken,
};

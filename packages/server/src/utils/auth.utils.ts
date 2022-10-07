import bcrypt from "bcrypt";
import { Request } from "express";
import jwt from "jsonwebtoken";
import { AuthResponse, IAuth, IAuthDTO, Roles } from "types";
import ReporterModule from "../models/reporter.module";
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

async function createAuthResponse(
  auth: IAuth,
  token?: string
): Promise<AuthResponse> {
  const user = await UserModule.findOne({ auth: auth._id });

  const response: AuthResponse = {
    auth: authUtils.authToAuthDTO(auth),
    token: token || createToken(auth._id || ""),
  };

  if (user) {
    response.user = {
      likedReports: user.likedReports,
      savedReporters: user.savedReporters,
      _id: user._id,
    };
  }
  if (auth.role === Roles.REPORTER) {
    const reporter = await ReporterModule.findOne({
      auth: auth._id,
    }).populate("reports");

    if (reporter) {
      response.reporter = {
        reports: reporter.reports,
        _id: reporter._id,
      };
    }
  }

  return response;
}

export const authUtils = {
  hashPassword,
  comparePassword,
  verifyJwt,
  getTokenFromRequest,
  authToAuthDTO,
  createToken,
  createAuthResponse,
};

import { NextFunction, Request, Response } from "express";
import { AuthResponse, IAuth, Roles } from "types";
import { authService } from "../services/auth.service";
import { reporterService } from "../services/reporter.service";
import { userService } from "../services/user.service";
import { authUtils } from "../utils/auth.utils";
import { reporterUtils } from "../utils/reporter.utils";
import { userUtils } from "../utils/user.utils";

async function createAuthResponse(
  auth: IAuth,
  token?: string
): Promise<AuthResponse> {
  const user = await userService.getByAuth(auth);

  const response: AuthResponse = {
    auth: authUtils.authToAuthDTO(auth),
    token: token || authUtils.createToken(auth._id || ""),
  };

  if (user) {
    response.user = userUtils.userToUserDTO(user);
  }
  if (auth.role === Roles.REPORTER) {
    const reporter = await reporterService.getByAuth(auth, {
      withReports: true,
      withAuth: true,
    });

    if (reporter) {
      response.reporter = reporterUtils.reporterToReporterDTO(reporter);
    }
  }

  return response;
}

async function login(req: Request, res: Response, next: NextFunction) {
  const { email, password } = req.body;

  try {
    const { auth, token } = await authService.login(email, password);
    const response = await createAuthResponse(auth, token);

    return res.json(response);
  } catch (e) {
    next(e);
  }
}

async function getSession(_: Request, res: Response, next: NextFunction) {
  try {
    const auth: IAuth = res.locals.auth;
    if (!auth) {
      return res.json({ auth: null });
    }

    const response = await createAuthResponse(auth);
    res.json(response);
  } catch (e) {
    next(e);
  }
}

export const authController = {
  login,
  getSession,
};

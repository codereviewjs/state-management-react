import { NextFunction, Request, Response } from "express";
import { IAuth } from "types";
import { authService } from "../services/auth.service";
import { authUtils } from "../utils/auth.utils";

async function login(req: Request, res: Response, next: NextFunction) {
  const { email, password } = req.body;

  try {
    const { auth, token } = await authService.login(email, password);
    const response = await authUtils.createAuthResponse(auth, token);

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

    const response = await authUtils.createAuthResponse(auth);
    res.json(response);
  } catch (e) {
    next(e);
  }
}

export const authController = {
  login,
  getSession,
};

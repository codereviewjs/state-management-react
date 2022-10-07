import { Request, Response } from "express";
import { IAuth, IUser, Roles } from "types";
import { AuthModule, ReporterModule, UserModule } from "../models";
import { authUtils } from "../utils";

async function login(req: Request, res: Response) {
  const { email, password } = req.body;

  try {
    const auth = await AuthModule.login(email, password);
    console.log(auth);

    const response = await authUtils.createAuthResponse(auth);

    return res.json(response);
  } catch (e) {
    return res.status(400).json({ error: "invalid credential" });
  }
}

async function logout(req: Request, res: Response) {
  try {
    return res.json({ message: "logged out successfully" });
  } catch (e: unknown) {
    return res.json({ error: "Something went wrong" }).status(500);
  }
}

async function getSession(req: Request, res: Response) {
  const auth: IAuth = res.locals.auth;
  if (!auth) {
    return res.json({ auth: null });
  }

  const response = await authUtils.createAuthResponse(auth);
  res.json(response);
}

export const authController = {
  login,
  logout,
  getSession,
};

import { Request, Response } from "express";
import { IAuth, IUser } from "types";
import { AuthModule } from "../models";
import { authUtils } from "../utils";

async function login(req: Request, res: Response) {
  const { email, password } = req.body;

  try {
    const user = await AuthModule.login(email, password);

    const response: { user: IUser; token: string } = {
      user: authUtils.parseAuthToUser(user),
      token: authUtils.createToken(user._id || ""),
    };

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
  const user: IAuth = res.locals.user;
  if (!user) {
    return res.json({ user: null });
  }

  const response: { user: IUser; token: string } = {
    user: authUtils.parseAuthToUser(user),
    token: authUtils.createToken(user._id || ""),
  };
  res.json(response);
}

export const authController = {
  login,
  logout,
  getSession,
};

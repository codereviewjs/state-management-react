import { Request, Response } from "express";
import { IAuth, IUser } from "types";
import jwt from "jsonwebtoken";
import { AuthModule } from "../models";

function createToken(id: string) {
  // TODO - replace secret from env
  return jwt.sign({ id }, "some-secret", {
    expiresIn: "1h",
  });
}

async function login(req: Request, res: Response) {
  const { email, password } = req.body;

  try {
    const user = await AuthModule.login(email, password);
    const token = await createToken(user._id || "");

    const response: { user: IUser; token: string } = {
      user: {
        _id: user._id,
        email: user.email,
        admin: user.admin,
        reporter: user.reporter,
      },
      token,
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
    user: {
      _id: user._id,
      email: user.email,
      admin: user.admin,
      reporter: user.reporter,
    },
    token: createToken(user._id || ""),
  };
  res.json(response);
}

export const authController = {
  login,
  logout,
  getSession,
};

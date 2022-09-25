import { Request, Response } from "express";
import AuthModule, { IAuth } from "../models/auth.module";

const user = {
  email: "admin@gmail.com",
  password: "password",
};

export async function login(req: Request, res: Response) {
  const { email, password } = req.body;
  const user = await AuthModule.findOne({ email });

  if (!user || user?.password !== password) {
    return res.json({ error: "Not valid credential" }).status(401);
  }

  if (user.isLoggedIn) {
    return res.json({ error: "Already logged in" }).status(400);
  }

  user.isLoggedIn = true;
  await user.save();

  return res.json({
    id: user.id,
    email: user.email,
    isLoggedIn: true,
  });
}

export async function logout(req: Request, res: Response) {
  try {
    const { id } = req.body;
    if (!id) {
      return res.json({ error: "Not valid credential" }).status(401);
    }

    const user = await AuthModule.findById(id).exec();

    if (!user) {
      return res.json({ error: "Not valid credential" }).status(401);
    }

    if (!user.isLoggedIn) {
      return res.json({ error: "Already not logged in" }).status(400);
    }

    user.isLoggedIn = false;
    await user.save();

    return res.json({ message: "logged out successfully" });
  } catch (e: any) {
    return res.json({ error: "Something went wrong" }).status(500);
  }
}

import { Request, Response, NextFunction } from "express";
import { IAuth } from "../models/auth.model";
import { userService } from "../services/user.service";
import { HttpException } from "../utils/HttpException";
import { userUtils } from "../utils/user.utils";

async function me(_: Request, res: Response, next: NextFunction) {
  try {
    const auth: IAuth = res.locals.auth;

    const user = await userService.getByAuth(auth);

    if (!user) throw new HttpException(404, "user not found");

    res.json({
      user: userUtils.userToUserDTO(user),
    });
  } catch (e) {
    next(e);
  }
}

export const userController = {
  me,
};

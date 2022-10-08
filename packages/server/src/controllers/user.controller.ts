import { Request, Response, NextFunction } from "express";
import { IAuth } from "types";
import { userService } from "../services/user.service";
import { HttpException } from "../utils/HttpException";
import { userUtils } from "../utils/user.utils";

async function me(req: Request, res: Response, next: NextFunction) {
  try {
    const auth: IAuth = res.locals.auth;

    const user = await userService.getByAuth(auth, {
      withLikedReports: true,
    });

    console.log("found user", user);
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

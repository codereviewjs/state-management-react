import { Request, Response, NextFunction } from "express";
import jwt, { Jwt } from "jsonwebtoken";
import Auth from "../models/auth.module";

const requireAuth = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token) {
    jwt.verify(token, "some-secret", (err: any) => {
      if (err) {
        return res.status(403).json({ error: "not authenticated" });
      }
      next();
    });
  } else {
    return res.status(401).json({ error: "not authenticated" });
  }
};

const getUserFromJwtCb =
  (res: Response, next: NextFunction): jwt.VerifyCallback =>
  async (err, decodedToken) => {
    if (err || !decodedToken || typeof decodedToken !== "object") {
      res.locals.user = null;
      next();
    } else {
      // @ts-expect-error
      const user = await Auth.findById(decodedToken.id).populate("reporter");
      res.locals.user = user;
      next();
    }
  };

const getAuthUser = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token) {
    jwt.verify(token, "some-secret", getUserFromJwtCb(res, next));
  } else {
    res.locals.user = null;
    next();
  }
};

export const authMiddleware = {
  required: requireAuth,
  authUser: getAuthUser,
};

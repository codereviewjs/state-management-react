import { Request, Response, NextFunction } from "express";
import Auth from "../models/auth.module";
import { authUtils } from "../utils";

const requireAuth = async (req: Request, res: Response, next: NextFunction) => {
  const token = authUtils.getTokenFromRequest(req);

  if (token) {
    authUtils.verifyJwt(token, (err) => {
      if (err) {
        return res.status(403).json({ error: "not authenticated" });
      }
      next();
    });
  } else {
    return res.status(401).json({ error: "not authenticated" });
  }
};

const getAuthUser = (req: Request, res: Response, next: NextFunction) => {
  const token = authUtils.getTokenFromRequest(req);

  if (token) {
    authUtils.verifyJwt(token, async (err, decodedToken) => {
      if (err || !decodedToken || typeof decodedToken !== "object") {
        res.locals.user = null;
        next();
      } else {
        // @ts-expect-error
        const user = await Auth.findById(decodedToken.id).populate("reporter");
        res.locals.user = user;
        next();
      }
    });
  } else {
    res.locals.user = null;
    next();
  }
};

export const authMiddleware = {
  required: requireAuth,
  authUser: getAuthUser,
};

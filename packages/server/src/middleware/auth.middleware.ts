import { Request, Response, NextFunction } from "express";
import { Roles } from "types";
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
  try {
    const token = authUtils.getTokenFromRequest(req);

    if (token) {
      authUtils.verifyJwt(token, async (err, decodedToken) => {
        if (err || !decodedToken || typeof decodedToken !== "object") {
          res.locals.user = null;
          next();
        } else {
          // @ts-expect-error
          const user = await Auth.findById(decodedToken.id).populate(
            "reporter"
          );

          res.locals.user = user;
          next();
        }
      });
    } else {
      res.locals.user = null;
      next();
    }
  } catch (e) {
    console.log(e);

    return res.status(500);
  }
};

const requireRole =
  (role: Roles) => (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = authUtils.getTokenFromRequest(req);

      if (token) {
        authUtils.verifyJwt(token, async (err, decodedToken) => {
          if (err || !decodedToken || typeof decodedToken !== "object") {
            return res.status(403).json({ error: "not allowed" });
          }

          // @ts-expect-error
          const user = await Auth.findById(decodedToken.id).populate(
            "reporter"
          );

          if (user && user.role === role) {
            res.locals.user = user;
            next();
          } else {
            return res.status(403).json({ error: "not allowed" });
          }
        });
      } else {
        return res.status(403).json({ error: "not allowed" });
      }
    } catch (e) {
      console.log(e);

      return res.status(500);
    }
  };

const requireAdmin = requireRole(Roles.ADMIN);
const requireReporter = requireRole(Roles.REPORTER);

export const authMiddleware = {
  required: requireAuth,
  requireAdmin,
  requireReporter,
  authUser: getAuthUser,
};

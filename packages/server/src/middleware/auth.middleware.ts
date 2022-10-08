import { Request, Response, NextFunction } from "express";
import { Roles } from "types";
import AuthModel from "../models/auth.model";
import { authUtils } from "../utils/auth.utils";

const findAuthByTokenId = (id: string) => AuthModel.findById(id);

const requireAuth = async (req: Request, res: Response, next: NextFunction) => {
  const token = authUtils.getTokenFromRequest(req);

  if (token) {
    authUtils.verifyJwt(token, async (err, decodedToken) => {
      if (err) {
        console.log("HERE", err.message);

        return res.status(403).json({ error: "not authenticated" });
      }

      // @ts-expect-error
      const auth = await findAuthByTokenId(decodedToken.id);
      res.locals.auth = auth;
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
          res.locals.auth = null;
          next();
        } else {
          // @ts-expect-error
          const auth = await findAuthByTokenId(decodedToken.id);
          res.locals.auth = auth;
          next();
        }
      });
    } else {
      res.locals.auth = null;
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
          const auth = await findAuthByTokenId(decodedToken.id);

          if (auth && auth.role === role) {
            res.locals.auth = auth;
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
  requireAuth,
  requireAdmin,
  requireReporter,
  authUser: getAuthUser,
};

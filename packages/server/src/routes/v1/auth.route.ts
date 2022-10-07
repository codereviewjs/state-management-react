import express from "express";
import { authController } from "../../controllers/auth.controller";
import { authMiddleware } from "../../middleware/auth.middleware";

const router = express.Router();

router.get("/session", authMiddleware.authUser, authController.getSession);
router.post("/login", authController.login);

export default router;

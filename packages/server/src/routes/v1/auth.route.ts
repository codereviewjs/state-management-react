import express from "express";
import { authController } from "../../controllers";
import { authMiddleware } from "../../middleware";

const router = express.Router();

router.get("/session", authMiddleware.authUser, authController.getSession);
router.post("/login", authController.login);
router.delete("/logout", authMiddleware.required, authController.logout);

export default router;

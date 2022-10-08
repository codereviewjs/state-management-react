import express from "express";
import { userController } from "../../controllers/user.controller";
import { authMiddleware } from "../../middleware/auth.middleware";

const router = express.Router();

router.get("/me", authMiddleware.requireAuth, userController.me);

export default router;

import express from "express";
import { reporterController } from "../../controllers/reporter.controller";
import { authMiddleware } from "../../middleware/auth.middleware";

const router = express.Router();

router.get("/", reporterController.getAll);
router.get("/:id", reporterController.getOne);
router.delete("/:id", authMiddleware.requireAdmin, reporterController.remove);

export default router;

import express from "express";
import { reporterController } from "../../controllers";
import { authMiddleware } from "../../middleware";

const router = express.Router();

router.get("/", reporterController.getAll);
router.get("/:id", reporterController.getOne);
router.delete("/:id", authMiddleware.requireAdmin, reporterController.remove);

export default router;

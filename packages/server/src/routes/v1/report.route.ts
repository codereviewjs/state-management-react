import express from "express";
import { reportController } from "../../controllers/report.controller";
import { authMiddleware } from "../../middleware/auth.middleware";

const router = express.Router();

router.get("/", authMiddleware.authUser, reportController.getAll);
router.get(
  "/authReports",
  authMiddleware.authUser,
  reportController.getReportsByAuth
);
router.get("/:id", authMiddleware.authUser, reportController.getOne);
router.delete("/:id", authMiddleware.requireReporter, reportController.remove);
router.put("/:id", authMiddleware.requireReporter, reportController.update);
router.put("/like/:id", authMiddleware.requireAuth, reportController.like);
router.post("/", authMiddleware.requireReporter, reportController.create);

export default router;

import express from "express";
import { reportController } from "../../controllers/report.controller";
import { authMiddleware } from "../../middleware/auth.middleware";

const router = express.Router();

router.get("/", reportController.getAll);
router.get(
  "/authReports",
  authMiddleware.authUser,
  reportController.getReportsByAuth
);
router.get("/:id", reportController.getOne);
router.put("/:id", authMiddleware.requireReporter, reportController.update);
router.delete("/:id", authMiddleware.requireReporter, reportController.remove);
router.post("/", authMiddleware.requireReporter, reportController.create);

export default router;

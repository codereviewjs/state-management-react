import express from "express";
import { reportController } from "../../controllers";
import { authMiddleware } from "../../middleware";

const router = express.Router();

router.get("/", reportController.getAll);
router.get("/authReports", authMiddleware.authUser ,reportController.getReportsByAuth);
router.get("/:id", reportController.getOne);

export default router;

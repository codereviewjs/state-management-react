import express from "express";
import { reportController } from "../../controllers";
import { authMiddleware } from "../../middleware";

const router = express.Router();

router.get("/", reportController.getAll);
router.get(
  "/authReports",
  authMiddleware.authUser,
  reportController.getReportsByAuth
);
router.get("/:id", reportController.getOne);
router.put("/:id", authMiddleware.authUser, reportController.update);
router.delete("/:id", authMiddleware.authUser, reportController.remove);
router.post("/", authMiddleware.authUser, reportController.create);

export default router;

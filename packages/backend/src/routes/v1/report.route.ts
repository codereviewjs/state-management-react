import express from "express";
import { reportController } from "../../controllers";

const router = express.Router();

router.get("/", reportController.getAll);
router.get("/:id", reportController.getOne);

export default router;

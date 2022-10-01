import express from "express";
import { reporterController } from "../../controllers";

const router = express.Router();

router.get("/", reporterController.getAll);
router.get("/:id", reporterController.getOne);

export default router;

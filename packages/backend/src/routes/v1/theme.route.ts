import express from "express";
import { themeController } from "../../controllers";

const router = express.Router();

router.get("/", themeController.getAll);
router.get("/:id", themeController.getOne);

export default router;

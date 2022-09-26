import express from "express";
import { authorController } from "../../controllers";

const router = express.Router();

router.get("/", authorController.getAll);
router.get("/:id", authorController.getOne);

export default router;

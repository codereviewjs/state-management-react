import express from "express";
import { bookController } from "../../controllers";

const router = express.Router();

router.get("/", bookController.getAll);
router.get("/:id", bookController.getOne);

export default router;

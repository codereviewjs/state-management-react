import express from "express";
import { metadataController } from "../../controllers";

const router = express.Router();

router.get("/", metadataController.getOne);

export default router;

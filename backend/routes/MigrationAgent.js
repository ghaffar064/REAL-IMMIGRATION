import express from "express";
import { createAgent } from "../controllers/MigrationAgent.js";
import { upload } from "../middlewares/multer.js";

const router = express.Router()

router.post('/createAgent',upload.single("fileName"),createAgent)
export default router;
import express from "express";
import { allAgents, createAgent } from "../controllers/MigrationAgent.js";
import { upload } from "../middlewares/multer.js";

const router = express.Router()

router.post('/createAgent',upload.single("fileName"),createAgent)
router.get("/allAgents",allAgents)
export default router;
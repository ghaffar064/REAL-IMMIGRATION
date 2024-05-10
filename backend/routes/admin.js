import express from "express";
import { adminPanel } from "../controllers/admin.js";

const router = express.Router();
router.get("/admin",adminPanel)
export default router;
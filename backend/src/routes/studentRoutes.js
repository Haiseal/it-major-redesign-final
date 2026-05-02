import express from "express";
import { getStudentDashboard } from "../controllers/studentController.js";
import { verifyToken, requireRole } from "../middleware/auth.js";

const router = express.Router();

router.get("/dashboard", verifyToken, requireRole("student"), getStudentDashboard);

export default router;

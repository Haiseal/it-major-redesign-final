import express from "express";
import {
  generateRecommendation,
  getRecommendationByRunId,
  getRecommendationRuns,
  getAssessmentFormOptions,
} from "../controllers/recommendationController.js";
import { verifyToken, requireRole } from "../middleware/auth.js";

const router = express.Router();

router.get("/form-options", verifyToken, requireRole("student", "advisor", "department_admin", "system_admin"), getAssessmentFormOptions);
router.get("/runs", verifyToken, requireRole("student", "advisor", "department_admin", "system_admin"), getRecommendationRuns);
router.post("/generate", verifyToken, requireRole("student"), generateRecommendation);
router.get("/:runId", verifyToken, requireRole("student", "advisor", "department_admin", "system_admin"), getRecommendationByRunId);

export default router;

import express from "express";
import {
  getAdvisorDashboard,
  getAdvisorStudents,
  createAdvisorNote,
  getAdvisorNotesByRunId,
  updateAdvisorNote,
  deleteAdvisorNote,
  updateReviewStatus,
} from "../controllers/advisorController.js";
import { verifyToken, requireRole } from "../middleware/auth.js";

const router = express.Router();

router.get("/dashboard", verifyToken, requireRole("advisor"), getAdvisorDashboard);
router.get("/students", verifyToken, requireRole("advisor"), getAdvisorStudents);
router.post("/notes", verifyToken, requireRole("advisor"), createAdvisorNote);
router.get("/notes/:runId", verifyToken, requireRole("advisor", "student"), getAdvisorNotesByRunId);
router.put("/notes/:noteId", verifyToken, requireRole("advisor"), updateAdvisorNote);
router.delete("/notes/:noteId", verifyToken, requireRole("advisor"), deleteAdvisorNote);
router.put("/runs/:runId/status", verifyToken, requireRole("advisor"), updateReviewStatus);

export default router;

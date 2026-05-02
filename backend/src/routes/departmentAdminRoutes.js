import express from "express";
import {
  getDepartmentDashboard,
  getMajors,
  createMajor,
  updateMajor,
  deleteMajor,
  getSubjects,
  createSubject,
  updateSubject,
  deleteSubject,
  getAllLearningPaths,
  getLearningPathsByMajor,
  createLearningPath,
  updateLearningPath,
  deleteLearningPath,
  getWeightsByMajor,
  updateWeight,
} from "../controllers/departmentAdminController.js";
import { verifyToken, requireRole } from "../middleware/auth.js";

const router = express.Router();

router.get("/dashboard", verifyToken, requireRole("department_admin"), getDepartmentDashboard);
router.get("/majors", verifyToken, requireRole("department_admin", "advisor", "student", "system_admin"), getMajors);
router.post("/majors", verifyToken, requireRole("department_admin"), createMajor);
router.put("/majors/:id", verifyToken, requireRole("department_admin"), updateMajor);
router.delete("/majors/:id", verifyToken, requireRole("department_admin"), deleteMajor);

router.get("/subjects", verifyToken, requireRole("department_admin", "system_admin"), getSubjects);
router.post("/subjects", verifyToken, requireRole("department_admin"), createSubject);
router.put("/subjects/:id", verifyToken, requireRole("department_admin"), updateSubject);
router.delete("/subjects/:id", verifyToken, requireRole("department_admin"), deleteSubject);

router.get("/learning-paths", verifyToken, requireRole("department_admin", "system_admin"), getAllLearningPaths);
router.get("/learning-paths/:majorId", verifyToken, requireRole("department_admin", "advisor", "student", "system_admin"), getLearningPathsByMajor);
router.post("/learning-paths", verifyToken, requireRole("department_admin"), createLearningPath);
router.put("/learning-paths/:id", verifyToken, requireRole("department_admin"), updateLearningPath);
router.delete("/learning-paths/:id", verifyToken, requireRole("department_admin"), deleteLearningPath);

router.get("/weights/:majorId", verifyToken, requireRole("department_admin", "advisor", "system_admin"), getWeightsByMajor);
router.put("/weights/:type/:id", verifyToken, requireRole("department_admin"), updateWeight);

export default router;

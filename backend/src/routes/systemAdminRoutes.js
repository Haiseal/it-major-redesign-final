import express from "express";
import { getSystemDashboard, getUsers, createUser, updateUser, deleteUser } from "../controllers/systemAdminController.js";
import { verifyToken, requireRole } from "../middleware/auth.js";

const router = express.Router();

router.get("/dashboard", verifyToken, requireRole("system_admin"), getSystemDashboard);
router.get("/users", verifyToken, requireRole("system_admin"), getUsers);
router.post("/users", verifyToken, requireRole("system_admin"), createUser);
router.put("/users/:id", verifyToken, requireRole("system_admin"), updateUser);
router.delete("/users/:id", verifyToken, requireRole("system_admin"), deleteUser);

export default router;

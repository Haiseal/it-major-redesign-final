import express from "express";
import { login, me, registerStudent, updateProfile } from "../controllers/authController.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.post("/register", registerStudent);
router.post("/login", login);
router.get("/me", verifyToken, me);
router.put("/profile", verifyToken, updateProfile);

export default router;

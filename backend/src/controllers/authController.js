import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { db } from "../config/db.js";

function buildToken(user) {
  return jwt.sign(
    {
      id: user.id,
      fullName: user.full_name,
      email: user.email,
      role: user.role
    },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRE || "15m" }
  );
}

function toUserPayload(user) {
  return {
    id: user.id,
    fullName: user.full_name,
    email: user.email,
    role: user.role,
    studentCode: user.student_code,
    departmentName: user.department_name,
    intakeYear: user.intake_year,
    studyYear: user.study_year,
    accountStatus: user.account_status,
    createdAt: user.created_at
  };
}

export const registerStudent = async (req, res) => {
  try {
    const {
      fullName,
      email,
      password,
      studentCode = null,
      departmentName = "School of Computer Science and Engineering",
      intakeYear = null,
      studyYear = "Year 2"
    } = req.body;

    const [existing] = await db.execute("SELECT id FROM users WHERE email = ? LIMIT 1", [email]);
    if (existing[0]) {
      return res.status(409).json({ message: "Email already exists." });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const [result] = await db.execute(
      `INSERT INTO users
       (full_name, email, role, password_hash, student_code, department_name, intake_year, study_year, account_status)
       VALUES (?, ?, 'student', ?, ?, ?, ?, ?, 'active')`,
      [fullName, email, passwordHash, studentCode, departmentName, intakeYear || null, studyYear]
    );

    const [rows] = await db.execute(
      `SELECT id, full_name, email, role, student_code, department_name, intake_year, study_year, account_status, created_at
       FROM users WHERE id = ? LIMIT 1`,
      [result.insertId]
    );

    const user = rows[0];
    const accessToken = buildToken(user);
    return res.status(201).json({ accessToken, user: toUserPayload(user) });
  } catch (error) {
    console.error("register error:", error);
    return res.status(500).json({ message: "Registration failed." });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const [rows] = await db.execute(
      `SELECT id, full_name, email, role, password_hash, student_code, department_name, intake_year, study_year, account_status, created_at
       FROM users WHERE email = ? LIMIT 1`,
      [email]
    );

    const user = rows[0];

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    if (user.account_status !== "active") {
      return res.status(403).json({ message: `This account is ${user.account_status}.` });
    }

    const isMatch = await bcrypt.compare(password, user.password_hash || "");

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    const accessToken = buildToken(user);
    return res.json({ accessToken, user: toUserPayload(user) });
  } catch (error) {
    console.error("login error:", error);
    return res.status(500).json({ message: "Login failed." });
  }
};

export const me = async (req, res) => {
  try {
    const [rows] = await db.execute(
      `SELECT id, full_name, email, role, student_code, department_name, intake_year, study_year, account_status, created_at
       FROM users WHERE id = ? LIMIT 1`,
      [req.user.id]
    );

    if (!rows[0]) {
      return res.status(404).json({ message: "User not found." });
    }

    return res.json(toUserPayload(rows[0]));
  } catch (error) {
    console.error("me error:", error);
    return res.status(500).json({ message: "Failed to fetch profile." });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { fullName, studentCode, departmentName, intakeYear, studyYear } = req.body;

    await db.execute(
      `UPDATE users
       SET full_name = ?, student_code = ?, department_name = ?, intake_year = ?, study_year = ?
       WHERE id = ?`,
      [fullName, studentCode || null, departmentName || null, intakeYear || null, studyYear || null, req.user.id]
    );

    const [rows] = await db.execute(
      `SELECT id, full_name, email, role, student_code, department_name, intake_year, study_year, account_status, created_at
       FROM users WHERE id = ? LIMIT 1`,
      [req.user.id]
    );

    return res.json({ message: "Profile updated successfully.", user: toUserPayload(rows[0]) });
  } catch (error) {
    console.error("update profile error:", error);
    return res.status(500).json({ message: "Failed to update profile." });
  }
};

import bcrypt from "bcryptjs";
import { db } from "../config/db.js";

export const getSystemDashboard = async (_req, res) => {
  try {
    const [[totalRow]] = await db.execute("SELECT COUNT(*) AS totalUsers FROM users");
    const [byRole] = await db.execute(
      "SELECT role, COUNT(*) AS total FROM users GROUP BY role ORDER BY role ASC"
    );
    res.json({ totalUsers: totalRow.totalUsers || 0, usersByRole: byRole });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to load system dashboard." });
  }
};

export const getUsers = async (_req, res) => {
  try {
    const [rows] = await db.execute(
      `SELECT id, full_name, email, role, student_code, department_name, intake_year, study_year, account_status, created_at
       FROM users ORDER BY id ASC`
    );
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch users." });
  }
};

export const createUser = async (req, res) => {
  try {
    const { fullName, email, role, password, studentCode = null, departmentName = null, intakeYear = null, studyYear = null, accountStatus = 'active' } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);
    await db.execute(
      `INSERT INTO users (full_name, email, role, password_hash, student_code, department_name, intake_year, study_year, account_status)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [fullName, email, role, passwordHash, studentCode, departmentName, intakeYear || null, studyYear, accountStatus]
    );
    res.json({ message: "User created successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create user." });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { fullName, role, studentCode = null, departmentName = null, intakeYear = null, studyYear = null, accountStatus = 'active' } = req.body;
    await db.execute(
      `UPDATE users
       SET full_name = ?, role = ?, student_code = ?, department_name = ?, intake_year = ?, study_year = ?, account_status = ?
       WHERE id = ?`,
      [fullName, role, studentCode, departmentName, intakeYear || null, studyYear, accountStatus, id]
    );
    res.json({ message: "User updated successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update user." });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await db.execute("DELETE FROM users WHERE id = ?", [id]);
    res.json({ message: "User deleted successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to delete user." });
  }
};

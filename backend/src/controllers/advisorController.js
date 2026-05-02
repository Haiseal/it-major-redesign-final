import { db } from "../config/db.js";

export const getAdvisorDashboard = async (_req, res) => {
  try {
    const [[studentsRow]] = await db.execute(
      "SELECT COUNT(*) AS totalStudents FROM users WHERE role = 'student'"
    );
    const [[pendingRow]] = await db.execute(
      "SELECT COUNT(*) AS pendingReviews FROM recommendation_runs WHERE review_status = 'Pending'"
    );
    const [[reviewedWeekRow]] = await db.execute(
      `SELECT COUNT(*) AS reviewedThisWeek
       FROM recommendation_runs
       WHERE review_status IN ('Reviewed', 'Advised')
         AND created_at >= DATE_SUB(NOW(), INTERVAL 7 DAY)`
    );
    const [recentActivity] = await db.execute(
      `SELECT rr.id, u.full_name AS student_name, rr.created_at, rr.review_status,
              m.name AS top_major_name
       FROM recommendation_runs rr
       JOIN users u ON rr.student_id = u.id
       LEFT JOIN recommendation_results r ON rr.id = r.run_id AND r.ranking_position = 1
       LEFT JOIN majors m ON r.major_id = m.id
       ORDER BY rr.created_at DESC, rr.id DESC
       LIMIT 6`
    );

    res.json({
      totalStudents: studentsRow.totalStudents || 0,
      pendingReviews: pendingRow.pendingReviews || 0,
      reviewedThisWeek: reviewedWeekRow.reviewedThisWeek || 0,
      recentActivity,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to load advisor dashboard." });
  }
};

export const getAdvisorStudents = async (_req, res) => {
  try {
    const [rows] = await db.execute(
      `SELECT rr.id, rr.created_at, rr.review_status,
              u.full_name AS student_name, u.student_code,
              m.name AS top_major_name, r.level AS confidence_level
       FROM recommendation_runs rr
       JOIN users u ON rr.student_id = u.id
       LEFT JOIN recommendation_results r ON rr.id = r.run_id AND r.ranking_position = 1
       LEFT JOIN majors m ON r.major_id = m.id
       ORDER BY rr.created_at DESC, rr.id DESC`
    );
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to load student list." });
  }
};

export const createAdvisorNote = async (req, res) => {
  try {
    const { runId, noteText } = req.body;
    const advisorId = req.user.id;

    await db.execute(
      "INSERT INTO advisory_notes (run_id, advisor_id, note_text) VALUES (?, ?, ?)",
      [runId, advisorId, noteText]
    );

    res.json({ message: "Advisor note added successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to add advisor note." });
  }
};

export const getAdvisorNotesByRunId = async (req, res) => {
  try {
    const { runId } = req.params;

    const [rows] = await db.execute(
      `SELECT an.id, an.run_id, an.advisor_id, an.note_text, an.created_at, an.updated_at,
              u.full_name AS advisor_name
       FROM advisory_notes an
       JOIN users u ON an.advisor_id = u.id
       WHERE an.run_id = ?
       ORDER BY an.created_at DESC`,
      [runId]
    );

    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch advisor notes." });
  }
};

export const updateAdvisorNote = async (req, res) => {
  try {
    const { noteId } = req.params;
    const { noteText } = req.body;

    const [rows] = await db.execute("SELECT * FROM advisory_notes WHERE id = ?", [noteId]);
    if (!rows[0]) return res.status(404).json({ message: "Advisor note not found." });
    if (Number(rows[0].advisor_id) !== Number(req.user.id)) {
      return res.status(403).json({ message: "You can only edit your own note." });
    }

    await db.execute("UPDATE advisory_notes SET note_text = ? WHERE id = ?", [noteText, noteId]);
    res.json({ message: "Advisor note updated successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update advisor note." });
  }
};

export const deleteAdvisorNote = async (req, res) => {
  try {
    const { noteId } = req.params;

    const [rows] = await db.execute("SELECT * FROM advisory_notes WHERE id = ?", [noteId]);
    if (!rows[0]) return res.status(404).json({ message: "Advisor note not found." });
    if (Number(rows[0].advisor_id) !== Number(req.user.id)) {
      return res.status(403).json({ message: "You can only delete your own note." });
    }

    await db.execute("DELETE FROM advisory_notes WHERE id = ?", [noteId]);
    res.json({ message: "Advisor note deleted successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to delete advisor note." });
  }
};

export const updateReviewStatus = async (req, res) => {
  try {
    const { runId } = req.params;
    const { reviewStatus } = req.body;

    await db.execute("UPDATE recommendation_runs SET review_status = ? WHERE id = ?", [reviewStatus, runId]);
    res.json({ message: "Review status updated successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update review status." });
  }
};

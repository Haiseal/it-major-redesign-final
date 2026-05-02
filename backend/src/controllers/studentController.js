import { db } from "../config/db.js";

export const getStudentDashboard = async (req, res) => {
  try {
    const studentId = req.user.id;

    const [[totalRow]] = await db.execute(
      "SELECT COUNT(*) AS totalAssessments FROM recommendation_runs WHERE student_id = ?",
      [studentId]
    );

    const [latestRows] = await db.execute(
      `SELECT rr.id, rr.created_at, rr.review_status, r.total_score, r.level, m.name AS top_major_name
       FROM recommendation_runs rr
       LEFT JOIN recommendation_results r ON rr.id = r.run_id AND r.ranking_position = 1
       LEFT JOIN majors m ON r.major_id = m.id
       WHERE rr.student_id = ?
       ORDER BY rr.created_at DESC, rr.id DESC
       LIMIT 1`,
      [studentId]
    );

    const [feedbackRows] = await db.execute(
      `SELECT an.id, an.note_text, an.created_at, u.full_name AS advisor_name, rr.id AS run_id
       FROM advisory_notes an
       JOIN users u ON an.advisor_id = u.id
       JOIN recommendation_runs rr ON an.run_id = rr.id
       WHERE rr.student_id = ?
       ORDER BY an.created_at DESC
       LIMIT 1`,
      [studentId]
    );

    const [subjectScoreRows] = await db.execute(
      `SELECT s.id, s.subject_code, s.name, s.category, sss.score
       FROM student_subject_scores sss
       JOIN subjects s ON s.id = sss.subject_id
       WHERE sss.student_id = ?
       ORDER BY s.category ASC, s.name ASC`,
      [studentId]
    );

    res.json({
      latestRecommendation: latestRows[0] || null,
      latestFeedback: feedbackRows[0] || null,
      totalAssessments: totalRow.totalAssessments || 0,
      latestSubjectScores: subjectScoreRows,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to load student dashboard." });
  }
};

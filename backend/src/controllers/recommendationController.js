import { db } from "../config/db.js";
import { generateRecommendationResult } from "../services/recommendationService.js";

function validateSubjectScores(subjectScores = {}) {
  const entries = Object.entries(subjectScores).filter(
    ([, value]) => value !== '' && value !== null && value !== undefined
  );

  if (entries.length === 0) {
    return 'Please enter at least one subject score.';
  }

  for (const [subjectCode, rawValue] of entries) {
    const score = Number(rawValue);

    if (Number.isNaN(score)) {
      return `Score for "${subjectCode}" must be a number.`;
    }

    if (score < 0 || score > 10) {
      return `Score for "${subjectCode}" must be between 0 and 10.`;
    }
  }

  return null;
}

async function saveStudentProfile(studentId, subjectScores, interests, selfAssessments) {
  const connection = await db.getConnection();
  try {
    await connection.beginTransaction();
    await connection.execute("DELETE FROM student_subject_scores WHERE student_id = ?", [studentId]);
    await connection.execute("DELETE FROM user_interests WHERE student_id = ?", [studentId]);
    await connection.execute("DELETE FROM self_assessment_answers WHERE student_id = ?", [studentId]);

    const [subjects] = await connection.execute(
      "SELECT id, subject_code FROM subjects ORDER BY display_order ASC, id ASC"
    );
    const [interestRows] = await connection.execute(
      "SELECT id, name FROM interests ORDER BY display_order ASC, id ASC"
    );
    const [questionRows] = await connection.execute(
      "SELECT id, question_text FROM self_assessment_questions ORDER BY display_order ASC, id ASC"
    );

    for (const subject of subjects) {
      const rawValue = subjectScores[subject.subject_code];
      if (rawValue !== undefined && rawValue !== '' && rawValue !== null) {
        await connection.execute(
          "INSERT INTO student_subject_scores (student_id, subject_id, score) VALUES (?, ?, ?)",
          [studentId, subject.id, Number(rawValue)]
        );
      }
    }

    for (const interest of interestRows) {
      if (interests[interest.name] !== undefined) {
        await connection.execute(
          "INSERT INTO user_interests (student_id, interest_id, rating) VALUES (?, ?, ?)",
          [studentId, interest.id, Number(interests[interest.name])]
        );
      }
    }

    for (const question of questionRows) {
      if (selfAssessments[question.question_text] !== undefined) {
        await connection.execute(
          "INSERT INTO self_assessment_answers (student_id, question_id, rating) VALUES (?, ?, ?)",
          [studentId, question.id, Number(selfAssessments[question.question_text])]
        );
      }
    }

    await connection.commit();
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
}

export const getAssessmentFormOptions = async (_req, res) => {
  try {
    const [subjects] = await db.execute(
      `SELECT id, subject_code, name, category, is_year1_input, is_used_in_algorithm, display_order
       FROM subjects
       WHERE is_year1_input = TRUE
       ORDER BY display_order ASC, id ASC`
    );
    const [interests] = await db.execute(
      "SELECT id, name FROM interests ORDER BY display_order ASC, id ASC"
    );
    const [questions] = await db.execute(
      "SELECT id, question_text FROM self_assessment_questions ORDER BY display_order ASC, id ASC"
    );

    res.json({ subjects, interests, questions });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to load form options." });
  }
};

export const generateRecommendation = async (req, res) => {
  try {
    const studentId = req.user.id;
    const { subjectScores = {}, interests = {}, selfAssessments = {} } = req.body;

    const validationError = validateSubjectScores(subjectScores);
    if (validationError) {
      return res.status(400).json({ message: validationError });
    }

    await saveStudentProfile(studentId, subjectScores, interests, selfAssessments);
    const results = await generateRecommendationResult({ subjectScores, interests, selfAssessments });
    const [runResult] = await db.execute(
      "INSERT INTO recommendation_runs (student_id, review_status) VALUES (?, 'Pending')",
      [studentId]
    );
    const runId = runResult.insertId;

    for (const item of results) {
      await db.execute(
        `INSERT INTO recommendation_results
        (run_id, major_id, academic_score, interest_score, self_assessment_score, total_score, level, explanation, weakness_suggestion, ranking_position)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          runId,
          item.majorId,
          item.academicScore,
          item.interestScore,
          item.selfAssessmentScore,
          item.totalScore,
          item.level,
          item.explanation,
          item.weaknessSuggestion,
          item.rankingPosition,
        ]
      );
    }

    res.json({ message: "Recommendation generated successfully.", runId, results });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to generate recommendation." });
  }
};

export const getRecommendationByRunId = async (req, res) => {
  try {
    const { runId } = req.params;
    const [runRows] = await db.execute(
      `SELECT rr.id, rr.student_id, rr.review_status, rr.created_at,
              u.full_name AS student_name, u.email AS student_email,
              u.student_code, u.department_name, u.intake_year, u.study_year
       FROM recommendation_runs rr
       JOIN users u ON rr.student_id = u.id
       WHERE rr.id = ? LIMIT 1`,
      [runId]
    );

    const run = runRows[0];
    if (!run) {
      return res.status(404).json({ message: "Recommendation run not found." });
    }
    if (req.user.role === "student" && Number(run.student_id) !== Number(req.user.id)) {
      return res.status(403).json({ message: "Access denied for this recommendation run." });
    }

    const [results] = await db.execute(
      `SELECT rr.*, m.code AS major_code, m.name AS major_name
       FROM recommendation_results rr
       JOIN majors m ON rr.major_id = m.id
       WHERE rr.run_id = ?
       ORDER BY rr.ranking_position ASC`,
      [runId]
    );

    const [notes] = await db.execute(
      `SELECT an.id, an.advisor_id, an.note_text, an.created_at, an.updated_at, u.full_name AS advisor_name
       FROM advisory_notes an
       JOIN users u ON an.advisor_id = u.id
       WHERE an.run_id = ?
       ORDER BY an.created_at DESC`,
      [runId]
    );

    const [learningPaths] = await db.execute(
      `SELECT mlp.id, mlp.major_id, mlp.year_label, mlp.content, m.code AS major_code, m.name AS major_name
       FROM major_learning_paths mlp
       JOIN majors m ON mlp.major_id = m.id
       ORDER BY mlp.major_id, mlp.year_label`
    );

    const [subjectScores] = await db.execute(
      `SELECT s.name, s.subject_code, s.category, s.is_used_in_algorithm, sss.score
       FROM student_subject_scores sss
       JOIN subjects s ON sss.subject_id = s.id
       WHERE sss.student_id = ?
       ORDER BY s.display_order ASC, s.id ASC`,
      [run.student_id]
    );
    const [interestRows] = await db.execute(
      `SELECT i.name, ui.rating
       FROM user_interests ui
       JOIN interests i ON ui.interest_id = i.id
       WHERE ui.student_id = ?
       ORDER BY i.display_order ASC, i.id ASC`,
      [run.student_id]
    );
    const [selfAssessmentRows] = await db.execute(
      `SELECT q.question_text, saa.rating
       FROM self_assessment_answers saa
       JOIN self_assessment_questions q ON saa.question_id = q.id
       WHERE saa.student_id = ?
       ORDER BY q.display_order ASC, q.id ASC`,
      [run.student_id]
    );

    res.json({
      run,
      results,
      notes,
      learningPaths,
      inputs: {
        subjectScores,
        interests: interestRows,
        selfAssessments: selfAssessmentRows,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch recommendation result." });
  }
};

export const getRecommendationRuns = async (req, res) => {
  try {
    let query = `SELECT rr.id, rr.student_id, rr.review_status, rr.created_at,
                        u.full_name AS student_name, u.email AS student_email, u.student_code,
                        top.major_name AS top_major_name, top.level AS top_level, top.total_score AS top_total_score,
                        (SELECT COUNT(*) FROM advisory_notes an WHERE an.run_id = rr.id) AS note_count
                 FROM recommendation_runs rr
                 JOIN users u ON rr.student_id = u.id
                 LEFT JOIN (
                    SELECT rr2.run_id, m.name AS major_name, rr2.level, rr2.total_score
                    FROM recommendation_results rr2
                    JOIN majors m ON rr2.major_id = m.id
                    WHERE rr2.ranking_position = 1
                 ) AS top ON top.run_id = rr.id`;

    const params = [];
    if (req.user.role === "student") {
      query += " WHERE rr.student_id = ?";
      params.push(req.user.id);
    }
    query += " ORDER BY rr.created_at DESC, rr.id DESC";
    const [rows] = await db.execute(query, params);
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch recommendation runs." });
  }
};

import { db } from "../config/db.js";

export const getDepartmentDashboard = async (_req, res) => {
  try {
    const [[majorsRow]] = await db.execute("SELECT COUNT(*) AS totalMajors FROM majors");
    const [[subjectsRow]] = await db.execute("SELECT COUNT(*) AS totalSubjects FROM subjects");
    const [[pathsRow]] = await db.execute("SELECT COUNT(*) AS totalLearningPaths FROM major_learning_paths");
    res.json({
      totalMajors: majorsRow.totalMajors || 0,
      totalSubjects: subjectsRow.totalSubjects || 0,
      totalLearningPaths: pathsRow.totalLearningPaths || 0,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to load department dashboard." });
  }
};

export const getMajors = async (_req, res) => {
  try {
    const [rows] = await db.execute("SELECT * FROM majors ORDER BY id ASC");
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch majors." });
  }
};

export const createMajor = async (req, res) => {
  try {
    const { code, name, description = '' } = req.body;
    const [result] = await db.execute(
      "INSERT INTO majors (code, name, description) VALUES (?, ?, ?)",
      [code, name, description]
    );
    const majorId = result.insertId;

    // Auto-initialize all weight mappings for the new major
    const [subjects] = await db.execute(
      "SELECT id FROM subjects WHERE is_used_in_algorithm = true ORDER BY display_order ASC, id ASC"
    );
    const [interests] = await db.execute("SELECT id FROM interests ORDER BY display_order ASC, id ASC");
    const [questions] = await db.execute(
      "SELECT id FROM self_assessment_questions ORDER BY display_order ASC, id ASC"
    );

    for (const s of subjects) {
      await db.execute(
        "INSERT IGNORE INTO major_foundation_requirements (major_id, subject_id, weight) VALUES (?, ?, 1.0)",
        [majorId, s.id]
      );
    }
    for (const i of interests) {
      await db.execute(
        "INSERT IGNORE INTO interest_major_weights (major_id, interest_id, weight) VALUES (?, ?, 1.0)",
        [majorId, i.id]
      );
    }
    for (const q of questions) {
      await db.execute(
        "INSERT IGNORE INTO question_major_weights (major_id, question_id, weight) VALUES (?, ?, 1.0)",
        [majorId, q.id]
      );
    }

    res.json({ message: "Major created successfully.", majorId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create major." });
  }
};

export const updateMajor = async (req, res) => {
  try {
    const { id } = req.params;
    const { code, name, description = '' } = req.body;
    await db.execute("UPDATE majors SET code = ?, name = ?, description = ? WHERE id = ?", [code, name, description, id]);
    res.json({ message: "Major updated successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update major." });
  }
};

export const deleteMajor = async (req, res) => {
  try {
    const { id } = req.params;
    await db.execute("DELETE FROM majors WHERE id = ?", [id]);
    res.json({ message: "Major deleted successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to delete major." });
  }
};

export const getSubjects = async (_req, res) => {
  try {
    const [rows] = await db.execute("SELECT * FROM subjects ORDER BY display_order ASC, id ASC");
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch subjects." });
  }
};

export const createSubject = async (req, res) => {
  try {
    const {
      subjectCode, name, category,
      creditsTotal = null, creditsLecture = null, creditsLab = null,
      studyYear = null, studySemester = null, programTrack = null,
      isYear1Input = false, isUsedInAlgorithm = false, displayOrder = 999,
    } = req.body;
    await db.execute(
      `INSERT INTO subjects
      (subject_code, name, category, credits_total, credits_lecture, credits_lab, study_year, study_semester, program_track, is_year1_input, is_used_in_algorithm, display_order)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [subjectCode, name, category, creditsTotal, creditsLecture, creditsLab, studyYear, studySemester,
       programTrack || null, Boolean(isYear1Input), Boolean(isUsedInAlgorithm), Number(displayOrder || 999)]
    );
    res.json({ message: "Subject created successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create subject." });
  }
};

export const updateSubject = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      subjectCode, name, category,
      creditsTotal = null, creditsLecture = null, creditsLab = null,
      studyYear = null, studySemester = null, programTrack = null,
      isYear1Input = false, isUsedInAlgorithm = false, displayOrder = 999,
    } = req.body;
    await db.execute(
      `UPDATE subjects
       SET subject_code = ?, name = ?, category = ?, credits_total = ?, credits_lecture = ?, credits_lab = ?,
           study_year = ?, study_semester = ?, program_track = ?, is_year1_input = ?, is_used_in_algorithm = ?, display_order = ?
       WHERE id = ?`,
      [subjectCode, name, category, creditsTotal, creditsLecture, creditsLab, studyYear, studySemester,
       programTrack || null, Boolean(isYear1Input), Boolean(isUsedInAlgorithm), Number(displayOrder || 999), id]
    );
    res.json({ message: "Subject updated successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update subject." });
  }
};

export const deleteSubject = async (req, res) => {
  try {
    const { id } = req.params;
    await db.execute("DELETE FROM subjects WHERE id = ?", [id]);
    res.json({ message: "Subject deleted successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to delete subject." });
  }
};

export const getAllLearningPaths = async (_req, res) => {
  try {
    const [rows] = await db.execute(
      `SELECT mlp.id, mlp.major_id, mlp.year_label, mlp.content, m.name AS major_name, m.code AS major_code
       FROM major_learning_paths mlp JOIN majors m ON mlp.major_id = m.id
       ORDER BY m.id ASC, mlp.year_label ASC`
    );
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch learning paths." });
  }
};

export const getLearningPathsByMajor = async (req, res) => {
  try {
    const { majorId } = req.params;
    const [rows] = await db.execute(
      `SELECT mlp.id, mlp.major_id, mlp.year_label, mlp.content, m.name AS major_name, m.code AS major_code
       FROM major_learning_paths mlp JOIN majors m ON mlp.major_id = m.id
       WHERE mlp.major_id = ? ORDER BY mlp.year_label ASC`,
      [majorId]
    );
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch learning paths." });
  }
};

export const createLearningPath = async (req, res) => {
  try {
    const { majorId, yearLabel, content } = req.body;
    await db.execute("INSERT INTO major_learning_paths (major_id, year_label, content) VALUES (?, ?, ?)", [majorId, yearLabel, content]);
    res.json({ message: "Learning path created successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create learning path." });
  }
};

export const updateLearningPath = async (req, res) => {
  try {
    const { id } = req.params;
    const { content, yearLabel } = req.body;
    await db.execute("UPDATE major_learning_paths SET content = ?, year_label = ? WHERE id = ?", [content, yearLabel, id]);
    res.json({ message: "Learning path updated successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update learning path." });
  }
};

export const deleteLearningPath = async (req, res) => {
  try {
    const { id } = req.params;
    await db.execute("DELETE FROM major_learning_paths WHERE id = ?", [id]);
    res.json({ message: "Learning path deleted successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to delete learning path." });
  }
};

export const getWeightsByMajor = async (req, res) => {
  try {
    const { majorId } = req.params;
    const [foundation] = await db.execute(
      `SELECT mfr.id, s.id AS subject_id, s.name, s.subject_code, mfr.weight
       FROM major_foundation_requirements mfr JOIN subjects s ON mfr.subject_id = s.id
       WHERE mfr.major_id = ? ORDER BY s.display_order ASC, s.id ASC`,
      [majorId]
    );
    const [interests] = await db.execute(
      `SELECT imw.id, i.id AS interest_id, i.name, imw.weight
       FROM interest_major_weights imw JOIN interests i ON imw.interest_id = i.id
       WHERE imw.major_id = ? ORDER BY i.display_order ASC, i.id ASC`,
      [majorId]
    );
    const [selfAssessments] = await db.execute(
      `SELECT qmw.id, q.id AS question_id, q.question_text, qmw.weight
       FROM question_major_weights qmw JOIN self_assessment_questions q ON qmw.question_id = q.id
       WHERE qmw.major_id = ? ORDER BY q.display_order ASC, q.id ASC`,
      [majorId]
    );
    const [availableSubjects] = await db.execute(
      `SELECT id, subject_code, name FROM subjects
       WHERE is_used_in_algorithm = true
         AND id NOT IN (SELECT subject_id FROM major_foundation_requirements WHERE major_id = ?)
       ORDER BY display_order ASC, id ASC`,
      [majorId]
    );
    res.json({ foundation, interests, selfAssessments, availableSubjects });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch weight mappings." });
  }
};

export const updateWeight = async (req, res) => {
  try {
    const { type, id } = req.params;
    const { weight } = req.body;
    const tableMap = {
      foundation: 'major_foundation_requirements',
      interests: 'interest_major_weights',
      selfAssessments: 'question_major_weights'
    };
    const table = tableMap[type];
    if (!table) return res.status(400).json({ message: 'Invalid weight type.' });
    await db.execute(`UPDATE ${table} SET weight = ? WHERE id = ?`, [weight, id]);
    res.json({ message: 'Weight updated successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to update weight.' });
  }
};

export const addFoundationSubject = async (req, res) => {
  try {
    const { majorId, subjectId, weight = 1.0 } = req.body;
    if (!majorId || !subjectId) {
      return res.status(400).json({ message: 'majorId and subjectId are required.' });
    }
    await db.execute(
      "INSERT IGNORE INTO major_foundation_requirements (major_id, subject_id, weight) VALUES (?, ?, ?)",
      [majorId, subjectId, Number(weight)]
    );
    res.json({ message: 'Subject added to major successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to add subject to major.' });
  }
};

export const removeFoundationSubject = async (req, res) => {
  try {
    const { id } = req.params;
    await db.execute("DELETE FROM major_foundation_requirements WHERE id = ?", [id]);
    res.json({ message: 'Subject removed from major successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to remove subject from major.' });
  }
};

export const initMajorWeights = async (req, res) => {
  try {
    const { majorId } = req.params;
    const [subjects] = await db.execute(
      "SELECT id FROM subjects WHERE is_used_in_algorithm = true ORDER BY display_order ASC, id ASC"
    );
    const [interests] = await db.execute("SELECT id FROM interests ORDER BY display_order ASC, id ASC");
    const [questions] = await db.execute(
      "SELECT id FROM self_assessment_questions ORDER BY display_order ASC, id ASC"
    );
    for (const s of subjects) {
      await db.execute(
        "INSERT IGNORE INTO major_foundation_requirements (major_id, subject_id, weight) VALUES (?, ?, 1.0)",
        [majorId, s.id]
      );
    }
    for (const i of interests) {
      await db.execute(
        "INSERT IGNORE INTO interest_major_weights (major_id, interest_id, weight) VALUES (?, ?, 1.0)",
        [majorId, i.id]
      );
    }
    for (const q of questions) {
      await db.execute(
        "INSERT IGNORE INTO question_major_weights (major_id, question_id, weight) VALUES (?, ?, 1.0)",
        [majorId, q.id]
      );
    }
    res.json({ message: 'Weights initialized successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to initialize weights.' });
  }
};

import { db } from "../config/db.js";

function normalizeAcademic(score10) {
  return Math.round(Number(score10) * 10);
}

function normalizeFiveScale(score5) {
  return Math.round((Number(score5) / 5) * 100);
}

function getLevel(score) {
  if (score >= 85) return "High";
  if (score >= 70) return "Medium";
  return "Low";
}

function weightedAverage(entries) {
  let total = 0;
  let totalWeight = 0;

  for (const item of entries) {
    total += Number(item.value) * Number(item.weight);
    totalWeight += Number(item.weight);
  }

  return totalWeight === 0 ? 0 : total / totalWeight;
}

function getTopMatches(weightedRows, sourceData, keyField, limit = 3) {
  return weightedRows
    .map((row) => ({
      name: row.name,
      value: Number(sourceData[row[keyField]] || 0),
      weight: Number(row.weight),
      weightedScore: Number(sourceData[row[keyField]] || 0) * Number(row.weight)
    }))
    .filter((item) => item.value > 0)
    .sort((a, b) => b.weightedScore - a.weightedScore)
    .slice(0, limit);
}

function getImportantWeaknesses(weightedRows, sourceData, keyField, threshold, limit = 2) {
  return weightedRows
    .map((row) => ({
      name: row.name,
      value: Number(sourceData[row[keyField]] || 0),
      weight: Number(row.weight)
    }))
    .filter((row) => row.value > 0 && row.value < threshold)
    .sort((a, b) => b.weight - a.weight)
    .slice(0, limit);
}

function buildExplanation({ majorName, majorCode, topSubjects, topInterests, topQuestions, academicScore, interestScore, selfAssessmentScore }) {
  const subjectPart = topSubjects.length ? topSubjects.map((item) => item.name).join(", ") : "your submitted Year 1 subjects";
  const interestPart = topInterests.length ? topInterests.map((item) => item.name).join(", ") : "your interests";
  const selfPart = topQuestions.length ? topQuestions.map((item) => item.name.replace(/^I /, "")).join(", ") : "your self-assessment";

  return `${majorName} (${majorCode}) is recommended because you perform well in ${subjectPart}, show strong interest in ${interestPart}, and your future-direction answers also align through ${selfPart}. The three component scores are Academic ${academicScore}%, Interest ${interestScore}%, and Self-assessment ${selfAssessmentScore}%.`;
}

function buildWeaknessSuggestion({ weakSubjects, weakInterests, weakQuestions }) {
  const advice = [];

  if (weakSubjects.length) {
    advice.push(`Strengthen ${weakSubjects.map((item) => item.name).join(", ")} through revision and practice.`);
  }

  if (weakInterests.length) {
    advice.push(`Explore ${weakInterests.map((item) => item.name).join(", ")} more through mini projects and practical activities.`);
  }

  if (weakQuestions.length) {
    advice.push(`Build confidence in ${weakQuestions.map((item) => item.name.replace(/^I /, "")).join(", ")} with guided exercises and teamwork.`);
  }

  if (!advice.length) {
    return "Your profile is relatively balanced. Continue improving through projects, practice, and specialization-oriented learning.";
  }

  return advice.join(" ");
}

function buildAcademicEntries(subjectWeights, subjectScores) {
  return subjectWeights
    .filter((item) => subjectScores[item.subject_code] !== undefined && subjectScores[item.subject_code] !== null && subjectScores[item.subject_code] !== '')
    .map((item) => ({
      value: subjectScores[item.subject_code],
      weight: item.weight,
    }));
}

export async function generateRecommendationResult(payload) {
  const { subjectScores = {}, interests = {}, selfAssessments = {} } = payload;

  const [majors] = await db.execute("SELECT id, code, name FROM majors ORDER BY id ASC");
  const results = [];

  for (const major of majors) {
    const [subjectWeights] = await db.execute(
      `SELECT s.subject_code, s.name, mfr.weight
       FROM major_foundation_requirements mfr
       JOIN subjects s ON mfr.subject_id = s.id
       WHERE mfr.major_id = ?`,
      [major.id]
    );

    const academicEntries = buildAcademicEntries(subjectWeights, subjectScores);
    const academicRaw = weightedAverage(academicEntries);

    const [interestWeights] = await db.execute(
      `SELECT i.name, imw.weight
       FROM interest_major_weights imw
       JOIN interests i ON imw.interest_id = i.id
       WHERE imw.major_id = ?`,
      [major.id]
    );

    const interestRaw = weightedAverage(
      interestWeights.map((item) => ({
        value: interests[item.name] || 0,
        weight: item.weight
      }))
    );

    const [questionWeights] = await db.execute(
      `SELECT q.question_text AS name, qmw.weight
       FROM question_major_weights qmw
       JOIN self_assessment_questions q ON qmw.question_id = q.id
       WHERE qmw.major_id = ?`,
      [major.id]
    );

    const selfRaw = weightedAverage(
      questionWeights.map((item) => ({
        value: selfAssessments[item.name] || 0,
        weight: item.weight
      }))
    );

    const academicScore = normalizeAcademic(academicRaw);
    const interestScore = normalizeFiveScale(interestRaw);
    const selfAssessmentScore = normalizeFiveScale(selfRaw);

    const totalScore = Math.round(
      0.5 * academicScore +
        0.3 * interestScore +
        0.2 * selfAssessmentScore
    );

    const topSubjects = getTopMatches(subjectWeights, subjectScores, 'subject_code', 3);
    const topInterests = getTopMatches(interestWeights, interests, 'name', 2);
    const topQuestions = getTopMatches(questionWeights, selfAssessments, 'name', 2);

    const weakSubjects = getImportantWeaknesses(subjectWeights, subjectScores, 'subject_code', 6.5, 2);
    const weakInterests = getImportantWeaknesses(interestWeights, interests, 'name', 3, 2);
    const weakQuestions = getImportantWeaknesses(questionWeights, selfAssessments, 'name', 3, 2);

    results.push({
      majorId: major.id,
      majorCode: major.code,
      majorName: major.name,
      academicScore,
      interestScore,
      selfAssessmentScore,
      totalScore,
      level: getLevel(totalScore),
      explanation: buildExplanation({
        majorName: major.name,
        majorCode: major.code,
        topSubjects,
        topInterests,
        topQuestions,
        academicScore,
        interestScore,
        selfAssessmentScore
      }),
      weaknessSuggestion: buildWeaknessSuggestion({
        weakSubjects,
        weakInterests,
        weakQuestions
      }),
      strengths: {
        subjects: topSubjects,
        interests: topInterests,
        selfAssessments: topQuestions
      },
      weaknesses: {
        subjects: weakSubjects,
        interests: weakInterests,
        selfAssessments: weakQuestions
      }
    });
  }

  results.sort((a, b) => b.totalScore - a.totalScore);
  results.forEach((item, index) => {
    item.rankingPosition = index + 1;
  });

  return results;
}

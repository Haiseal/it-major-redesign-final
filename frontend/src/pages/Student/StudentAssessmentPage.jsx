import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PageHeader from '../../components/PageHeader'
import LoadingState from '../../components/LoadingState'
import { getFormOptionsApi, generateRecommendation } from '../../api/recommendationApi'

const DRAFT_KEY = 'student-assessment-draft'

const futureGoalLabelMap = {
  'I enjoy solving programming problems.': 'I want my future career to involve a lot of coding and problem solving.',
  'I like working with data and finding patterns.': 'I want to work in a future direction related to data or analytics.',
  'I feel comfortable with mathematics and abstract reasoning.': 'I want a future role that requires mathematical and logical reasoning.',
  'I want to understand how computer systems and networks work.': 'I want a future role related to systems, infrastructure, or operations.',
  'I enjoy building practical applications for users.': 'I want a future job with practical software or solution delivery.',
  'I am interested in artificial intelligence and machine learning.': 'I want to grow in an AI or machine-learning related direction.',
  'I can stay patient when debugging difficult technical problems.': 'I want a future role that requires persistence in technical debugging.',
  'I want a future role that mixes teamwork, communication, and technical work.': 'I want a future role that combines teamwork, communication, and technical work.',
}

const categoryLabels = {
  foundation_math: 'Foundation Math Subjects',
  foundation_science: 'Foundation Science Subjects',
  it_core: 'IT Core Subjects',
  hardware_core: 'Hardware Core Subjects',
  software_core: 'Software Core Subjects',
  english: 'English Subjects',
  lab: 'Laboratory Subjects',
}

const categoryOrder = [
  'foundation_math',
  'foundation_science',
  'it_core',
  'hardware_core',
  'software_core',
  'english',
  'lab',
]

function formatCategoryTitle(category) {
  return categoryLabels[category] || category.replace(/_/g, ' ')
}

export default function StudentAssessmentPage() {
  const navigate = useNavigate()
  const [options, setOptions] = useState(null)
  const [submitting, setSubmitting] = useState(false)
  const [subjectScores, setSubjectScores] = useState({})
  const [interests, setInterests] = useState({})
  const [selfAssessments, setSelfAssessments] = useState({})
  const [errors, setErrors] = useState({})

  useEffect(() => {
    getFormOptionsApi().then((res) => {
      setOptions(res.data)
      const saved = JSON.parse(localStorage.getItem(DRAFT_KEY) || 'null')
      if (saved) {
        setSubjectScores(saved.subjectScores || {})
        setInterests(saved.interests || {})
        setSelfAssessments(saved.selfAssessments || {})
      } else {
        const interestInit = {}
        const selfInit = {}
        res.data.interests.forEach((item) => { interestInit[item.name] = 3 })
        res.data.questions.forEach((item) => { selfInit[item.question_text] = 3 })
        setInterests(interestInit)
        setSelfAssessments(selfInit)
      }
    })
  }, [])

  const groupedSubjects = useMemo(() => {
    const groups = {}
    ;(options?.subjects || []).forEach((subject) => {
      const key = subject.category || 'other'
      if (!groups[key]) groups[key] = []
      groups[key].push(subject)
    })

    return Object.entries(groups)
      .sort((a, b) => {
        const ai = categoryOrder.indexOf(a[0])
        const bi = categoryOrder.indexOf(b[0])
        const av = ai === -1 ? 999 : ai
        const bv = bi === -1 ? 999 : bi
        return av - bv
      })
      .map(([category, items]) => ({
        category,
        label: formatCategoryTitle(category),
        items,
      }))
  }, [options])

  const validateScore = (value) => {
    if (value === '' || value === undefined || value === null) return ''
    const numeric = Number(value)
    if (Number.isNaN(numeric)) return 'Score must be a number.'
    if (numeric < 0 || numeric > 10) return 'Score must be between 0 and 10.'
    return ''
  }

  const validateForm = () => {
    const nextErrors = {}

    groupedSubjects.forEach((group) => {
      group.items.forEach((subject) => {
        const message = validateScore(subjectScores[subject.subject_code])
        if (message) nextErrors[subject.subject_code] = message
      })
    })

    const hasAtLeastOneScore = Object.values(subjectScores).some((value) => value !== '' && value !== undefined && value !== null)
    if (!hasAtLeastOneScore) {
      nextErrors.__scores = 'Please enter at least one Year 1 subject score before generating a recommendation.'
    }

    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  const handleScoreChange = (subjectCode, rawValue) => {
    setSubjectScores((prev) => ({ ...prev, [subjectCode]: rawValue }))
    setErrors((prev) => ({ ...prev, [subjectCode]: validateScore(rawValue) }))
  }

  const saveDraft = () => {
    localStorage.setItem(DRAFT_KEY, JSON.stringify({ subjectScores, interests, selfAssessments }))
    alert('Draft saved locally.')
  }

  const handleSubmit = async () => {
    if (!validateForm()) return
    setSubmitting(true)
    try {
      const payload = {
        subjectScores: Object.fromEntries(
          Object.entries(subjectScores).filter(([, value]) => value !== '' && value !== undefined && value !== null)
        ),
        interests,
        selfAssessments,
      }
      const { data } = await generateRecommendation(payload)
      localStorage.removeItem(DRAFT_KEY)
      navigate(`/student/result/${data.runId}`)
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to generate recommendation.')
    } finally {
      setSubmitting(false)
    }
  }

  if (!options) return <LoadingState text="Loading assessment form..." />

  return (
    <div className="stack-lg">
      <PageHeader title="New Assessment" subtitle="Enter Year 1 HCMIU course scores on the 0–10 scale, then separately rate your current interests and your future goals." />

      <div className="stats-grid three">
        <div className="card muted-card">
          <h3>Part 1 — Academic scores</h3>
          <p>This section is only for Year 1 subject grades. Use the 0–10 scale and leave a box blank if you do not have the score yet.</p>
        </div>
        <div className="card muted-card">
          <h3>Part 2 — Current interests</h3>
          <p>This section asks what you enjoy now. It reflects your present preference, not your grades and not your future target.</p>
        </div>
        <div className="card muted-card">
          <h3>Part 3 — Future goals</h3>
          <p>This section asks what kind of direction you want in the future, even if it is different from your current interests.</p>
        </div>
      </div>

      <div className="card">
        <h3>Part 1 — HCMIU Year 1 Subject Scores</h3>
        <p className="muted">Suggested input subjects are based on the first-year foundation of the HCMIU Information Technology programme.</p>
        {errors.__scores ? <p className="danger-text">{errors.__scores}</p> : null}
        <div className="stats-grid three">
          {groupedSubjects.map((group) => (
            <div key={group.category} className="card muted-card">
              <h4>{group.label}</h4>
              <div className="stack-md">
                {group.items.map((subject) => (
                  <div key={subject.id} className="field-group">
                    <label>{subject.subject_code} · {subject.name}</label>
                    <input
                      type="number"
                      min="0"
                      max="10"
                      step="0.1"
                      placeholder="0 - 10"
                      value={subjectScores[subject.subject_code] ?? ''}
                      onChange={(e) => handleScoreChange(subject.subject_code, e.target.value)}
                    />
                    {errors[subject.subject_code] ? <span className="danger-text">{errors[subject.subject_code]}</span> : null}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="card">
        <h3>Part 2 — Current interests</h3>
        <div className="stack-md">
          {options.interests.map((item) => (
            <div key={item.id} className="slider-row">
              <label>{item.name}</label>
              <input type="range" min="1" max="5" value={interests[item.name] ?? 3} onChange={(e) => setInterests({ ...interests, [item.name]: Number(e.target.value) })} />
              <strong>{interests[item.name] ?? 3}</strong>
            </div>
          ))}
        </div>
      </div>

      <div className="card">
        <h3>Part 3 — Future goals and preferred direction</h3>
        <div className="stack-md">
          {options.questions.map((item) => (
            <div key={item.id} className="rating-row">
              <span>{futureGoalLabelMap[item.question_text] || item.question_text}</span>
              <div className="rating-group">
                {[1, 2, 3, 4, 5].map((value) => (
                  <button key={value} type="button" className={selfAssessments[item.question_text] === value ? 'rating-pill active' : 'rating-pill'} onClick={() => setSelfAssessments({ ...selfAssessments, [item.question_text]: value })}>{value}</button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bottom-actions">
        <button className="button secondary" onClick={() => navigate('/student/dashboard')}>Cancel</button>
        <button className="button secondary" onClick={saveDraft}>Save Draft</button>
        <button className="button primary" onClick={handleSubmit} disabled={submitting}>{submitting ? 'Generating...' : 'Generate Recommendation'}</button>
      </div>
    </div>
  )
}

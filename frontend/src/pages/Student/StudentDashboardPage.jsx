import { Link } from 'react-router-dom'
import { useEffect, useMemo, useState } from 'react'
import { getStudentDashboardApi } from '../../api/studentApi'
import PageHeader from '../../components/PageHeader'
import StatCard from '../../components/StatCard'
import LoadingState from '../../components/LoadingState'
import { useAuth } from '../../contexts/AuthContext'

const summaryGroupLabels = {
  foundation: 'Foundation Subjects',
  core: 'Core Subjects',
  english: 'English Subjects',
  science: 'Science Subjects',
  lab: 'Laboratory Subjects',
  other: 'Other Subjects',
}

function summarizeCategory(category) {
  if (['foundation_math', 'foundation_science'].includes(category)) return 'foundation'
  if (['it_core', 'hardware_core', 'software_core', 'systems', 'security', 'data_systems', 'information_systems', 'data_ai'].includes(category)) return 'core'
  if (category === 'english') return 'english'
  if (category === 'lab') return 'lab'
  if (category.includes('science')) return 'science'
  return 'other'
}

function ScoreGroupCard({ title, items, emptyText }) {
  return (
    <div className="card muted-card">
      <h3>{title}</h3>
      {items.length === 0 ? (
        <p className="muted">{emptyText}</p>
      ) : (
        <div className="stack-sm">
          {items.map((item) => (
            <div key={item.subject_code} className="row-between subject-score-row">
              <span>{item.subject_code} · {item.name}</span>
              <strong>{Number(item.score).toFixed(2)}</strong>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default function StudentDashboardPage() {
  const { user } = useAuth()
  const [data, setData] = useState(null)

  useEffect(() => {
    getStudentDashboardApi().then((res) => setData(res.data)).catch(() => setData({ totalAssessments: 0, latestSubjectScores: [] }))
  }, [])

  const groupedScores = useMemo(() => {
    const rows = data?.latestSubjectScores || []
    return rows.reduce((acc, item) => {
      const key = summarizeCategory(item.category || '')
      if (!acc[key]) acc[key] = []
      acc[key].push(item)
      return acc
    }, { foundation: [], core: [], english: [], science: [], lab: [], other: [] })
  }, [data])

  if (!data) return <LoadingState text="Loading student dashboard..." />

  return (
    <div className="stack-lg">
      <PageHeader
        title={`Hello ${user?.fullName || 'Student'} 👋`}
        subtitle="Review your current profile, latest assessment, and the subject scores you have submitted so far."
      />

      <div className="stats-grid three">
        <StatCard label="Total assessments" value={data.totalAssessments || 0} helper="Recommendation runs submitted" />
        <StatCard label="Latest top major" value={data.latestRecommendation?.top_major_name || 'N/A'} helper={data.latestRecommendation ? `Confidence: ${data.latestRecommendation.level}` : 'No assessment yet'} />
        <StatCard label="Latest feedback" value={data.latestFeedback ? 'Available' : 'No note'} helper={data.latestFeedback?.advisor_name || 'Advisor feedback will appear here'} />
      </div>

      <div className="card">
        <h3>Your profile</h3>
        <div className="stats-grid three">
          <div className="card muted-card"><strong>Name</strong><p>{user?.fullName || 'N/A'}</p></div>
          <div className="card muted-card"><strong>Email</strong><p>{user?.email || 'N/A'}</p></div>
          <div className="card muted-card"><strong>Student code</strong><p>{user?.studentCode || 'N/A'}</p></div>
          <div className="card muted-card"><strong>Department</strong><p>{user?.departmentName || 'N/A'}</p></div>
          <div className="card muted-card"><strong>Intake year</strong><p>{user?.intakeYear || 'N/A'}</p></div>
          <div className="card muted-card"><strong>Study year</strong><p>{user?.studyYear || 'N/A'}</p></div>
        </div>
      </div>

      <div className="card">
        <div className="row-between">
          <div>
            <h3>Latest submitted subject scores</h3>
            <p className="muted">These scores are grouped from your most recent saved assessment profile.</p>
          </div>
          <Link to="/student/assessment" className="button secondary">Update scores</Link>
        </div>

        <div className="stats-grid three">
          {Object.entries(groupedScores).map(([key, items]) => (
            <ScoreGroupCard
              key={key}
              title={summaryGroupLabels[key] || key}
              items={items}
              emptyText={`No ${key} scores submitted.`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

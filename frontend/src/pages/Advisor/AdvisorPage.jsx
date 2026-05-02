import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { getRecommendationRuns } from '../../api/recommendationApi'
import SectionCard from '../../components/SectionCard'

export default function AdvisorPage() {
  const [runs, setRuns] = useState([])
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState('All')

  useEffect(() => { getRecommendationRuns().then((res) => setRuns(res.data)) }, [])

  const filtered = useMemo(() => runs.filter((run) => {
    const matchQuery = `${run.student_name} ${run.student_email} ${run.student_code || ''}`.toLowerCase().includes(query.toLowerCase())
    const matchStatus = status === 'All' || run.review_status === status
    return matchQuery && matchStatus
  }), [runs, query, status])

  const pendingCount = runs.filter((r) => r.review_status === 'Pending').length

  return (
    <div className="stack-lg">
      <SectionCard title="Advisor dashboard" subtitle="A more realistic workflow with review status, search, and quick access to student runs.">
        <div className="grid-3">
          <div className="score-box"><span>Total runs</span><strong>{runs.length}</strong></div>
          <div className="score-box"><span>Pending review</span><strong>{pendingCount}</strong></div>
          <div className="score-box"><span>Advised</span><strong>{runs.filter((r) => r.review_status === 'Advised').length}</strong></div>
        </div>
      </SectionCard>

      <SectionCard title="Review queue" subtitle="Search by student name/email and filter by review status.">
        <div className="grid-2">
          <div className="field-group"><label>Search</label><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Student name or email" /></div>
          <div className="field-group"><label>Status</label><select value={status} onChange={(e) => setStatus(e.target.value)}><option>All</option><option>Pending</option><option>Reviewed</option><option>Advised</option></select></div>
        </div>
        <div className="stack-sm" style={{ marginTop: 14 }}>
          {filtered.length === 0 ? <p className="muted">No runs found.</p> : filtered.map((run) => (
            <div key={run.id} className="card muted-card">
              <div className="card-header"><div><h3>{run.student_name}</h3><p>{run.student_email} · {run.student_code || 'No student ID'}</p><p className="muted">{new Date(run.created_at).toLocaleString()}</p></div><span className={`badge badge-${(run.top_level || 'low').toLowerCase()}`}>{run.review_status}</span></div>
              <p>Top major: {run.top_major_name || 'N/A'} · Score: {run.top_total_score || 'N/A'} · Notes: {run.note_count}</p>
              <div className="hero-actions"><Link className="button secondary" to={`/result/${run.id}`}>Open result</Link></div>
            </div>
          ))}
        </div>
      </SectionCard>
    </div>
  )
}

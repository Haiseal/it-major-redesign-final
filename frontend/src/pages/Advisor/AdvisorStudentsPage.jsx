import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { getAdvisorStudentsApi } from '../../api/advisorApi'
import PageHeader from '../../components/PageHeader'
import LoadingState from '../../components/LoadingState'

export default function AdvisorStudentsPage() {
  const [rows, setRows] = useState(null)
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState('All')

  useEffect(() => { getAdvisorStudentsApi().then((res) => setRows(res.data)) }, [])

  const filteredRows = useMemo(() => {
    const list = rows || []
    return list.filter((row) => {
      const haystack = `${row.student_name} ${row.top_major_name || ''} ${row.review_status || ''}`.toLowerCase()
      const matchQuery = haystack.includes(query.toLowerCase())
      const matchStatus = status === 'All' || row.review_status === status
      return matchQuery && matchStatus
    })
  }, [rows, query, status])

  if (!rows) return <LoadingState text="Loading student list..." />

  return (
    <div className="stack-lg">
      <PageHeader title="Student Assessments" subtitle="Review submitted recommendation runs, search quickly, and open student notes." />
      <div className="card form-card">
        <div className="form-grid two">
          <div className="field-group">
            <label>Search</label>
            <input placeholder="Student name, major, or status" value={query} onChange={(e) => setQuery(e.target.value)} />
          </div>
          <div className="field-group">
            <label>Status</label>
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option>All</option>
              <option>Pending</option>
              <option>Reviewed</option>
              <option>Advised</option>
            </select>
          </div>
        </div>
      </div>
      <div className="card table-card">
        <table>
          <thead><tr><th>Student</th><th>Date</th><th>Top major</th><th>Status</th><th>Confidence</th><th /></tr></thead>
          <tbody>
            {filteredRows.map((row) => (
              <tr key={row.id}>
                <td>{row.student_name}</td>
                <td>{new Date(row.created_at).toLocaleDateString()}</td>
                <td>{row.top_major_name || 'N/A'}</td>
                <td>{row.review_status}</td>
                <td>{row.confidence_level || 'N/A'}</td>
                <td><Link className="button secondary small" to={`/advisor/run/${row.id}`}>View</Link></td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredRows.length === 0 ? <p className="muted">No student runs matched your search.</p> : null}
      </div>
    </div>
  )
}

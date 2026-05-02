import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getRecommendationRuns } from '../../api/recommendationApi'
import PageHeader from '../../components/PageHeader'
import LoadingState from '../../components/LoadingState'

export default function StudentHistoryPage() {
  const [rows, setRows] = useState(null)
  useEffect(() => { getRecommendationRuns().then((res) => setRows(res.data)) }, [])
  if (!rows) return <LoadingState text="Loading history..." />

  return (
    <div className="stack-lg">
      <PageHeader title="Assessment History" subtitle="Review your previous recommendation results." />
      <div className="card table-card">
        <table>
          <thead><tr><th>Date</th><th>Top major</th><th>Confidence</th><th>Status</th><th /></tr></thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id}>
                <td>{new Date(row.created_at).toLocaleDateString()}</td>
                <td>{row.top_major_name || 'N/A'}</td>
                <td>{row.top_level || 'N/A'}</td>
                <td>{row.review_status}</td>
                <td><Link className="button secondary small" to={`/student/result/${row.id}`}>View</Link></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

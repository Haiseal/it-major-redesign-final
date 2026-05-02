import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getAdvisorDashboardApi } from '../../api/advisorApi'
import PageHeader from '../../components/PageHeader'
import StatCard from '../../components/StatCard'
import LoadingState from '../../components/LoadingState'
import { useAuth } from '../../contexts/AuthContext'

export default function AdvisorDashboardPage() {
  const { user } = useAuth()
  const [data, setData] = useState(null)
  useEffect(() => { getAdvisorDashboardApi().then((res) => setData(res.data)) }, [])
  if (!data) return <LoadingState text="Loading advisor dashboard..." />

  return (
    <div className="stack-lg">
      <PageHeader title="Advisor Dashboard" subtitle="Overview of student recommendation reviews and your profile information." actions={<Link className="button primary" to="/advisor/students">Go to Student List</Link>} />
      <div className="stats-grid three">
        <StatCard label="Total students" value={data.totalStudents} />
        <StatCard label="Pending reviews" value={data.pendingReviews} />
        <StatCard label="Reviewed this week" value={data.reviewedThisWeek} />
      </div>
      <div className="stats-grid two">
        <div className="card">
          <h3>My profile</h3>
          <div className="stack-sm">
            <div className="simple-row"><span>Full name</span><strong>{user?.fullName || 'N/A'}</strong></div>
            <div className="simple-row"><span>Email</span><strong>{user?.email || 'N/A'}</strong></div>
            <div className="simple-row"><span>Role</span><strong>{user?.role || 'advisor'}</strong></div>
            <div className="simple-row"><span>Department</span><strong>{user?.departmentName || 'School of Computer Science and Engineering'}</strong></div>
          </div>
        </div>
        <div className="card">
          <h3>Recent activity</h3>
          <div className="stack-sm">
            {data.recentActivity.map((item) => (
              <div key={item.id} className="simple-row">
                <span>{item.student_name} — {item.top_major_name || 'No result'}</span>
                <Link className="button secondary small" to={`/advisor/run/${item.id}`}>View</Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

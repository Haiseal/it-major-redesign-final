import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getDepartmentDashboardApi } from '../../api/departmentAdminApi'
import PageHeader from '../../components/PageHeader'
import StatCard from '../../components/StatCard'
import LoadingState from '../../components/LoadingState'
import { useAuth } from '../../contexts/AuthContext'

export default function DepartmentDashboardPage() {
  const { user } = useAuth()
  const [data, setData] = useState(null)
  useEffect(() => { getDepartmentDashboardApi().then((res) => setData(res.data)) }, [])
  if (!data) return <LoadingState text="Loading department dashboard..." />

  return (
    <div className="stack-lg">
      <PageHeader title="Department Dashboard" subtitle="Manage academic data, learning content, and recommendation configuration." />
      <div className="stats-grid three">
        <StatCard label="Total majors" value={data.totalMajors} />
        <StatCard label="Total subjects" value={data.totalSubjects} />
        <StatCard label="Learning paths" value={data.totalLearningPaths} />
      </div>
      <div className="stats-grid two">
        <div className="card">
          <h3>My profile</h3>
          <div className="stack-sm">
            <div className="simple-row"><span>Full name</span><strong>{user?.fullName || 'N/A'}</strong></div>
            <div className="simple-row"><span>Email</span><strong>{user?.email || 'N/A'}</strong></div>
            <div className="simple-row"><span>Role</span><strong>{user?.role || 'department_admin'}</strong></div>
            <div className="simple-row"><span>Department</span><strong>{user?.departmentName || 'School of Computer Science and Engineering'}</strong></div>
          </div>
        </div>
        <div className="card">
          <h3>Quick links</h3>
          <div className="page-actions">
            <Link className="button secondary" to="/department/majors">Majors</Link>
            <Link className="button secondary" to="/department/subjects">Subjects</Link>
            <Link className="button secondary" to="/department/learning-paths">Learning Paths</Link>
            <Link className="button secondary" to="/department/weights">Weights</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

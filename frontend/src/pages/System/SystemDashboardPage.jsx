import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getSystemDashboardApi } from '../../api/systemAdminApi'
import PageHeader from '../../components/PageHeader'
import StatCard from '../../components/StatCard'
import LoadingState from '../../components/LoadingState'
import { useAuth } from '../../contexts/AuthContext'

export default function SystemDashboardPage() {
  const { user } = useAuth()
  const [data, setData] = useState(null)
  useEffect(() => { getSystemDashboardApi().then((res) => setData(res.data)) }, [])
  if (!data) return <LoadingState text="Loading system dashboard..." />

  return (
    <div className="stack-lg">
      <PageHeader title="System Dashboard" subtitle="Platform-level user administration overview with your profile summary." actions={<Link className="button primary" to="/system/users">Manage Users</Link>} />
      <div className="stats-grid two">
        <StatCard label="Total users" value={data.totalUsers} />
        <div className="card">
          <h3>Users by role</h3>
          <div className="stack-sm">
            {data.usersByRole.map((item) => <div key={item.role} className="simple-row"><span>{item.role}</span><strong>{item.total}</strong></div>)}
          </div>
        </div>
      </div>
      <div className="card">
        <h3>My profile</h3>
        <div className="stack-sm">
          <div className="simple-row"><span>Full name</span><strong>{user?.fullName || 'N/A'}</strong></div>
          <div className="simple-row"><span>Email</span><strong>{user?.email || 'N/A'}</strong></div>
          <div className="simple-row"><span>Role</span><strong>{user?.role || 'system_admin'}</strong></div>
          <div className="simple-row"><span>Status</span><strong>{user?.accountStatus || 'active'}</strong></div>
        </div>
      </div>
    </div>
  )
}

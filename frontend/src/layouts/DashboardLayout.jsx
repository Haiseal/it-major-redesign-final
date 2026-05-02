import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { sidebarByRole } from '../utils/roleRoutes'

const pageTitles = {
  '/student/dashboard': { eyebrow: 'Student', title: 'Dashboard' },
  '/student/assessment': { eyebrow: 'Student', title: 'Assessment' },
  '/student/history': { eyebrow: 'Student', title: 'History' },
  '/student/profile': { eyebrow: 'Student', title: 'Profile' },
  '/advisor/dashboard': { eyebrow: 'Advisor', title: 'Dashboard' },
  '/advisor/students': { eyebrow: 'Advisor', title: 'Student Assessments' },
  '/department/dashboard': { eyebrow: 'Department', title: 'Dashboard' },
  '/department/majors': { eyebrow: 'Department', title: 'Majors' },
  '/department/subjects': { eyebrow: 'Department', title: 'Subjects' },
  '/department/learning-paths': { eyebrow: 'Department', title: 'Learning Paths' },
  '/department/weights': { eyebrow: 'Department', title: 'Weights' },
  '/system/dashboard': { eyebrow: 'System', title: 'Dashboard' },
  '/system/users': { eyebrow: 'System', title: 'Users' },
}

function getPageMeta(pathname) {
  if (pathname.startsWith('/student/result/')) return { eyebrow: 'Student', title: 'Recommendation Result' }
  if (pathname.startsWith('/advisor/run/')) return { eyebrow: 'Advisor', title: 'Student Detail' }
  return pageTitles[pathname] || { eyebrow: 'Workspace', title: 'Page' }
}

export default function DashboardLayout() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const items = sidebarByRole[user?.role] || []
  const pageMeta = getPageMeta(location.pathname)

  return (
    <div className="dashboard-shell">
      <aside className="sidebar">
        <div className="sidebar-brand">
          <div className="brand-badge">IM</div>
          <div>
            <strong>IT Major System</strong>
            <div className="muted-small">Role-based workspace</div>
          </div>
        </div>

        <nav className="sidebar-nav">
          {items.map((item) => (
            <NavLink key={item.to} to={item.to} className={({ isActive }) => isActive ? 'sidebar-link active' : 'sidebar-link'}>
              {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>

      <div className="dashboard-main">
        <header className="topbar">
          <div>
            <div className="muted-small">{pageMeta.eyebrow}</div>
            <strong className="topbar-title">{pageMeta.title}</strong>
          </div>
          <div className="topbar-actions">
            <div className="avatar-chip">
              <span>{user?.fullName || user?.email}</span>
            </div>
            <button className="button secondary" onClick={() => { logout(); navigate('/login') }}>Logout</button>
          </div>
        </header>

        <main className="content-area">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

import { Link, NavLink } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { getDefaultRouteByRole } from '../utils/roleRoutes'

function itemClass({ isActive }) {
  return isActive ? 'nav-link nav-link-active' : 'nav-link'
}

export default function Navbar() {
  const { user, logout } = useAuth()
  const workspaceRoute = user ? getDefaultRouteByRole(user.role) : null

  return (
    <header className="navbar">
      <div className="navbar-inner">
        <div>
          <p className="eyebrow">Academic Decision Support System</p>
          <Link to="/" className="brand-title">IT Major Recommendation System</Link>
        </div>

        <nav className="nav-links">
          <NavLink to="/" className={itemClass}>Home</NavLink>
          {workspaceRoute ? <NavLink to={workspaceRoute} className={itemClass}>Workspace</NavLink> : null}
          {user?.role === 'student' && <NavLink to="/student/profile" className={itemClass}>Profile</NavLink>}
        </nav>

        <div className="hero-actions">
          {user ? (
            <>
              <span className="muted">{user.fullName || user.email} · {user.role}</span>
              <button className="button secondary" onClick={logout}>Logout</button>
            </>
          ) : (
            <>
              <NavLink to="/register" className="button secondary">Register</NavLink>
              <NavLink to="/login" className="button primary">Login</NavLink>
            </>
          )}
        </div>
      </div>
    </header>
  )
}

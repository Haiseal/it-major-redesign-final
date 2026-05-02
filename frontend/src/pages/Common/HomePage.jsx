import { Link, Navigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { getDefaultRouteByRole } from '../../utils/roleRoutes'

export default function HomePage() {
  const { user } = useAuth()
  if (user) return <Navigate to={getDefaultRouteByRole(user.role)} replace />

  return (
    <div className="marketing-shell">
      <div className="hero-panel">
        <div>
          <div className="hero-eyebrow">IT Major Recommendation System</div>
          <h1>Role-based academic decision support demo</h1>
          <p>
            Dashboard-first redesign with separate flows for Student, Advisor, Department Admin, and System Admin.
          </p>
        </div>
        <div className="hero-buttons">
          <Link className="button primary" to="/login">Login</Link>
          <Link className="button secondary" to="/register">Register Student</Link>
        </div>
      </div>
    </div>
  )
}

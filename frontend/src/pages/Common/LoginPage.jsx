import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { loginApi } from '../../api/authApi'
import { useAuth } from '../../contexts/AuthContext'
import { getDefaultRouteByRole } from '../../utils/roleRoutes'

const demoAccounts = [
  ['Student', 'student@example.com'],
  ['Advisor', 'advisor@example.com'],
  ['Department Admin', 'deptadmin@example.com'],
  ['System Admin', 'sysadmin@example.com'],
]

export default function LoginPage() {
  const [form, setForm] = useState({ email: '', password: '123456' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const { data } = await loginApi(form)
      login(data.accessToken, data.user)
      navigate(getDefaultRouteByRole(data.user.role))
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-stack">
      <div>
        <h1>Login</h1>
        <p>Use a seeded account or your registered student account.</p>
      </div>

      <form className="card form-card" onSubmit={handleSubmit}>
        <label>Email</label>
        <input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <label>Password</label>
        <input type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
        {error ? <div className="error-text">{error}</div> : null}
        <button className="button primary" disabled={loading}>{loading ? 'Signing in...' : 'Sign in'}</button>
      </form>

      <div className="card form-card">
        <h3>Demo accounts</h3>
        <div className="stack-sm">
          {demoAccounts.map(([label, email]) => (
            <button key={email} className="button secondary" onClick={() => setForm({ email, password: '123456' })}>{label}: {email}</button>
          ))}
        </div>
      </div>

      <p>No account? <Link to="/register">Register as student</Link></p>
    </div>
  )
}

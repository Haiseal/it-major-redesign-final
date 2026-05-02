import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { registerApi } from '../../api/authApi'
import { useAuth } from '../../contexts/AuthContext'
import { getDefaultRouteByRole } from '../../utils/roleRoutes'

export default function RegisterPage() {
  const [form, setForm] = useState({
    fullName: '', email: '', password: '', studentCode: '', intakeYear: 2024, studyYear: 'Year 2'
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const { data } = await registerApi(form)
      login(data.accessToken, data.user)
      navigate(getDefaultRouteByRole(data.user.role))
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-stack">
      <div>
        <h1>Register Student</h1>
        <p>Create a student account for the assessment flow.</p>
      </div>
      <form className="card form-card" onSubmit={handleSubmit}>
        <label>Full name</label>
        <input value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} />
        <label>Email</label>
        <input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <label>Password</label>
        <input type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
        <label>Student code</label>
        <input value={form.studentCode} onChange={(e) => setForm({ ...form, studentCode: e.target.value })} />
        <label>Intake year</label>
        <input type="number" value={form.intakeYear} onChange={(e) => setForm({ ...form, intakeYear: e.target.value })} />
        <label>Study year</label>
        <select value={form.studyYear} onChange={(e) => setForm({ ...form, studyYear: e.target.value })}>
          <option>Year 1</option><option>Year 2</option><option>Year 3</option><option>Year 4</option>
        </select>
        {error ? <div className="error-text">{error}</div> : null}
        <button className="button primary" disabled={loading}>{loading ? 'Creating...' : 'Create account'}</button>
      </form>
      <p>Already have an account? <Link to="/login">Back to login</Link></p>
    </div>
  )
}

import { Link } from 'react-router-dom'

export default function UnauthorizedPage() {
  return (
    <div className="card">
      <h1>Unauthorized</h1>
      <p>You do not have access to this page.</p>
      <Link className="button primary" to="/">Back home</Link>
    </div>
  )
}

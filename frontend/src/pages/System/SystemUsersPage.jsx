import { useEffect, useMemo, useState } from 'react'
import PageHeader from '../../components/PageHeader'
import LoadingState from '../../components/LoadingState'
import { createUserApi, deleteUserApi, getUsersApi, updateUserApi } from '../../api/systemAdminApi'

const emptyForm = { fullName: '', email: '', role: 'student', password: '123456', studentCode: '', departmentName: '', intakeYear: '', studyYear: '', accountStatus: 'active' }

const roleLabels = {
  student: 'Student account',
  advisor: 'Advisor account',
  department_admin: 'Department account',
  system_admin: 'System admin account',
}

export default function SystemUsersPage() {
  const [rows, setRows] = useState(null)
  const [form, setForm] = useState(emptyForm)
  const [editingId, setEditingId] = useState(null)
  const [query, setQuery] = useState('')
  const [roleFilter, setRoleFilter] = useState('All')

  const load = () => getUsersApi().then((res) => setRows(res.data))
  useEffect(() => { load() }, [])
  const filteredRows = useMemo(() => (rows || []).filter((row) => {
    const matchQuery = `${row.full_name} ${row.email} ${row.role} ${row.student_code || ''}`.toLowerCase().includes(query.toLowerCase())
    const matchRole = roleFilter === 'All' || row.role === roleFilter
    return matchQuery && matchRole
  }), [rows, query, roleFilter])
  if (!rows) return <LoadingState text="Loading users..." />

  const submit = async (e) => {
    e.preventDefault()
    if (editingId) await updateUserApi(editingId, form)
    else await createUserApi(form)
    setEditingId(null)
    setForm(emptyForm)
    load()
  }

  const renderRoleSpecificFields = () => {
    switch (form.role) {
      case 'student':
        return (
          <>
            <input placeholder="Student code" value={form.studentCode} onChange={(e) => setForm({ ...form, studentCode: e.target.value })} />
            <input placeholder="Department name" value={form.departmentName} onChange={(e) => setForm({ ...form, departmentName: e.target.value })} />
            <input placeholder="Intake year" value={form.intakeYear} onChange={(e) => setForm({ ...form, intakeYear: e.target.value })} />
            <input placeholder="Study year" value={form.studyYear} onChange={(e) => setForm({ ...form, studyYear: e.target.value })} />
          </>
        )
      case 'advisor':
      case 'department_admin':
        return <input placeholder="Department name" value={form.departmentName} onChange={(e) => setForm({ ...form, departmentName: e.target.value })} />
      default:
        return null
    }
  }

  return (
    <div className="stack-lg">
      <PageHeader title="User Management" subtitle="Create, search, update, deactivate, and delete platform users. The create form changes by role." />
      <form className="card form-card" onSubmit={submit}>
        <div className="page-actions" style={{ justifyContent: 'space-between' }}>
          <h3>{roleLabels[form.role]}</h3>
          <select value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value, studentCode: '', departmentName: '', intakeYear: '', studyYear: '' })}>
            <option value="student">student</option>
            <option value="advisor">advisor</option>
            <option value="department_admin">department_admin</option>
            <option value="system_admin">system_admin</option>
          </select>
        </div>
        <div className="form-grid four">
          <input placeholder="Full name" value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} />
          {!editingId ? <input placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /> : <input disabled value={form.email} />}
          {!editingId ? <input placeholder="Password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} /> : <input disabled value="Password unchanged" />}
          <select value={form.accountStatus} onChange={(e) => setForm({ ...form, accountStatus: e.target.value })}>
            <option value="active">active</option><option value="inactive">inactive</option><option value="suspended">suspended</option>
          </select>
          {renderRoleSpecificFields()}
        </div>
        <div className="page-actions">
          <button className="button secondary" type="button" onClick={() => { setEditingId(null); setForm(emptyForm) }}>Clear</button>
          <button className="button primary">{editingId ? 'Update User' : 'Create User'}</button>
        </div>
      </form>
      <div className="card form-card">
        <div className="form-grid two">
          <input placeholder="Search name, email, role, or student code" value={query} onChange={(e) => setQuery(e.target.value)} />
          <select value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)}>
            <option>All</option>
            <option value="student">student</option>
            <option value="advisor">advisor</option>
            <option value="department_admin">department_admin</option>
            <option value="system_admin">system_admin</option>
          </select>
        </div>
      </div>
      <div className="card table-card">
        <table>
          <thead><tr><th>Name</th><th>Email</th><th>Role</th><th>Status</th><th /></tr></thead>
          <tbody>
            {filteredRows.map((row) => (
              <tr key={row.id}>
                <td>{row.full_name}</td><td>{row.email}</td><td>{row.role}</td><td>{row.account_status}</td>
                <td>
                  <div className="page-actions compact-actions">
                    <button className="button secondary small" onClick={() => { setEditingId(row.id); setForm({ fullName: row.full_name, email: row.email, role: row.role, password: '', studentCode: row.student_code || '', departmentName: row.department_name || '', intakeYear: row.intake_year || '', studyYear: row.study_year || '', accountStatus: row.account_status }) }}>Edit</button>
                    <button className="button secondary small" onClick={() => { deleteUserApi(row.id).then(load) }}>Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredRows.length === 0 ? <p className="muted">No users matched your search.</p> : null}
      </div>
    </div>
  )
}

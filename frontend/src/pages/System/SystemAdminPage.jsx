import { useEffect, useState } from 'react'
import { createUserApi, deleteUserApi, getUsersApi, updateUserApi } from '../../api/systemAdminApi'
import SectionCard from '../../components/SectionCard'

const roles = ['student', 'advisor', 'department_admin', 'system_admin']
const statuses = ['active', 'inactive', 'suspended']

export default function SystemAdminPage() {
  const [users, setUsers] = useState([])
  const [form, setForm] = useState({ fullName: '', email: '', role: 'student', password: '123456', studentCode: '', departmentName: '', intakeYear: '', studyYear: '', accountStatus: 'active' })
  const loadUsers = async () => { const res = await getUsersApi(); setUsers(res.data) }
  useEffect(() => { loadUsers() }, [])

  return (
    <div className="stack-lg">
      <SectionCard title="System dashboard" subtitle="User administration now includes account status management, not only basic role changes.">
        <div className="grid-3">
          <div className="score-box"><span>Total users</span><strong>{users.length}</strong></div>
          <div className="score-box"><span>Active</span><strong>{users.filter((u) => u.account_status === 'active').length}</strong></div>
          <div className="score-box"><span>Suspended</span><strong>{users.filter((u) => u.account_status === 'suspended').length}</strong></div>
        </div>
      </SectionCard>
      <div className="grid-2">
        <SectionCard title="Create user" subtitle="Full CRUD for system accounts.">
          <form className="stack-md" onSubmit={async (e) => { e.preventDefault(); await createUserApi(form); setForm({ fullName: '', email: '', role: 'student', password: '123456', studentCode: '', departmentName: '', intakeYear: '', studyYear: '', accountStatus: 'active' }); loadUsers() }}>
            {['fullName','email','studentCode','departmentName','intakeYear','studyYear','password'].map((key) => <div key={key} className="field-group"><label>{key}</label><input type={key === 'email' ? 'email' : key === 'password' ? 'password' : 'text'} value={form[key]} onChange={(e) => setForm({ ...form, [key]: e.target.value })} /></div>)}
            <div className="field-group"><label>Role</label><select value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}>{roles.map((role) => <option key={role}>{role}</option>)}</select></div>
            <div className="field-group"><label>Status</label><select value={form.accountStatus} onChange={(e) => setForm({ ...form, accountStatus: e.target.value })}>{statuses.map((status) => <option key={status}>{status}</option>)}</select></div>
            <button className="button primary">Create user</button>
          </form>
        </SectionCard>
        <SectionCard title="User management" subtitle="Edit role and status, then delete if needed.">
          <div className="stack-sm">
            {users.map((user) => (
              <div key={user.id} className="card muted-card">
                <h3>{user.full_name}</h3><p>{user.email}</p>
                <div className="grid-2">
                  <div className="field-group"><label>Role</label><select value={user.role} onChange={(e) => setUsers((prev) => prev.map((u) => u.id === user.id ? { ...u, role: e.target.value } : u))}>{roles.map((role) => <option key={role}>{role}</option>)}</select></div>
                  <div className="field-group"><label>Status</label><select value={user.account_status} onChange={(e) => setUsers((prev) => prev.map((u) => u.id === user.id ? { ...u, account_status: e.target.value } : u))}>{statuses.map((status) => <option key={status}>{status}</option>)}</select></div>
                </div>
                <div className="hero-actions"><button className="button primary" onClick={async () => { await updateUserApi(user.id, { fullName: user.full_name, role: user.role, studentCode: user.student_code, departmentName: user.department_name, intakeYear: user.intake_year, studyYear: user.study_year, accountStatus: user.account_status }); loadUsers() }}>Save</button><button className="button danger" onClick={async () => { await deleteUserApi(user.id); loadUsers() }}>Delete</button></div>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>
    </div>
  )
}

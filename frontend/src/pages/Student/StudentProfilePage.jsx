import { useEffect, useState } from 'react'
import { meApi, updateProfileApi } from '../../api/authApi'
import SectionCard from '../../components/SectionCard'
import { useAuth } from '../../contexts/AuthContext'

export default function StudentProfilePage() {
  const { login } = useAuth()
  const [form, setForm] = useState({ fullName: '', studentCode: '', departmentName: '', intakeYear: '', studyYear: '' })
  const [message, setMessage] = useState('')

  useEffect(() => {
    meApi().then((res) => {
      setForm({
        fullName: res.data.fullName || '',
        studentCode: res.data.studentCode || '',
        departmentName: res.data.departmentName || '',
        intakeYear: res.data.intakeYear || '',
        studyYear: res.data.studyYear || ''
      })
    })
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const res = await updateProfileApi(form)
    login(localStorage.getItem('token'), res.data.user)
    setMessage('Profile updated successfully.')
  }

  return (
    <SectionCard title="Student profile" subtitle="Maintain a realistic student profile for the advising workflow.">
      <form className="grid-2" onSubmit={handleSubmit}>
        <div className="field-group"><label>Full name</label><input value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} required /></div>
        <div className="field-group"><label>Student ID</label><input value={form.studentCode} onChange={(e) => setForm({ ...form, studentCode: e.target.value })} /></div>
        <div className="field-group"><label>Department</label><input value={form.departmentName} onChange={(e) => setForm({ ...form, departmentName: e.target.value })} /></div>
        <div className="field-group"><label>Intake year</label><input type="number" min="2000" max="2100" value={form.intakeYear} onChange={(e) => setForm({ ...form, intakeYear: e.target.value })} /></div>
        <div className="field-group"><label>Study year</label><input value={form.studyYear} onChange={(e) => setForm({ ...form, studyYear: e.target.value })} placeholder="Year 1 / Year 2 / Year 3 / Year 4" /></div>
        <div className="hero-actions"><button className="button primary">Save profile</button></div>
        {message ? <p className="success-text">{message}</p> : null}
      </form>
    </SectionCard>
  )
}

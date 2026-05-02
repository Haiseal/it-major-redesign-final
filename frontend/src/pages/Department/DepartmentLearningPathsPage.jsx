import { useEffect, useMemo, useState } from 'react'
import PageHeader from '../../components/PageHeader'
import LoadingState from '../../components/LoadingState'
import { createLearningPathApi, deleteLearningPathApi, getLearningPathsApi, getMajorsApi, updateLearningPathApi } from '../../api/departmentAdminApi'

const emptyForm = { majorId: '', yearLabel: 'Year 1', content: '' }

const presetByYear = {
  'Year 1': 'Recommended Year 1 plan for HCMIU IT: MA001IU Calculus 1, EN007IU + EN008IU Academic English 1, IT064IU Introduction to Computing, IT116IU C/C++ Programming, PT001IU Physical Training 1, IT153IU Discrete Mathematics, Physics 1, Digital Logic Design and Digital Logic Design Laboratory. Students should focus on academic English, mathematical foundations, first programming habits, and laboratory discipline.',
  'Year 2': 'Recommended Year 2 plan: IT069IU Object-Oriented Programming, EN011IU + EN012IU Academic English 2, IT154IU Linear Algebra, MA003IU Calculus 2, IT013IU Algorithms and Data Structures, Principle of Electrical Engineering I and laboratory, Marxist-Leninist Philosophy, and other core engineering support courses. The goal is to strengthen data structures, abstraction, object-oriented design, mathematical maturity, and technical communication.',
  'Year 3': 'Recommended Year 3 plan: Database Systems, Computer Organization / Architecture, Operating Systems, Computer Networks, Web Application Development, Software Engineering, Probability and Statistics, Systems Analysis and Design, teamwork-oriented labs, and project implementation. Students should begin building a portfolio and deciding whether they prefer software, systems, data, or infrastructure directions.',
  'Year 4': 'Recommended Year 4 plan: advanced IT electives, enterprise application development, information assurance / security-related topics, distributed or cloud-oriented topics, capstone preparation, professional law / ethics requirements, and larger team projects. Students should connect coursework with internship goals, problem-solving depth, and real-world product thinking.',
  'Year 4.5': 'Recommended final stage: industrial internship, engineer internship / industrial attachment, graduation thesis or capstone project, technical presentation, CV and portfolio refinement, and specialization consolidation. This stage should convert academic strength into employability, practical evidence, and a clear professional profile for software engineering, IT operations, enterprise systems, or postgraduate study.'
}


export default function DepartmentLearningPathsPage() {
  const [majors, setMajors] = useState(null)
  const [paths, setPaths] = useState(null)
  const [selectedMajorId, setSelectedMajorId] = useState('')
  const [form, setForm] = useState(emptyForm)
  const [editingId, setEditingId] = useState(null)
  const [query, setQuery] = useState('')

  const load = async () => {
    const [majorRes, pathRes] = await Promise.all([getMajorsApi(), getLearningPathsApi()])
    setMajors(majorRes.data)
    setPaths(pathRes.data)
    if (!selectedMajorId && majorRes.data[0]) {
      setSelectedMajorId(String(majorRes.data[0].id))
      setForm((prev) => ({ ...prev, majorId: String(majorRes.data[0].id) }))
    }
  }

  useEffect(() => { load() }, [])
  const filtered = useMemo(() => (paths || []).filter((item) => {
    const matchMajor = String(item.major_id) === String(selectedMajorId)
    const matchQuery = `${item.year_label} ${item.content}`.toLowerCase().includes(query.toLowerCase())
    return matchMajor && matchQuery
  }), [paths, selectedMajorId, query])

  if (!majors || !paths) return <LoadingState text="Loading learning paths..." />

  const submit = async (e) => {
    e.preventDefault()
    const payload = { ...form, majorId: Number(form.majorId || selectedMajorId) }
    if (editingId) await updateLearningPathApi(editingId, { content: payload.content, yearLabel: payload.yearLabel })
    else await createLearningPathApi(payload)
    setEditingId(null)
    setForm({ majorId: selectedMajorId, yearLabel: 'Year 1', content: '' })
    load()
  }

  return (
    <div className="stack-lg">
      <PageHeader title="Learning Path Management" subtitle="Maintain richer year-by-year learning path content and search entries quickly." />
      <div className="card form-card">
        <label>Select major</label>
        <select value={selectedMajorId} onChange={(e) => { setSelectedMajorId(e.target.value); setForm({ ...form, majorId: e.target.value }) }}>
          {majors.map((major) => <option key={major.id} value={major.id}>{major.name}</option>)}
        </select>
      </div>
      <form className="card form-card" onSubmit={submit}>
        <div className="form-grid three">
          <select value={form.majorId || selectedMajorId} onChange={(e) => setForm({ ...form, majorId: e.target.value })}>
            {majors.map((major) => <option key={major.id} value={major.id}>{major.name}</option>)}
          </select>
          <select value={form.yearLabel} onChange={(e) => setForm({ ...form, yearLabel: e.target.value, content: form.content || presetByYear[e.target.value] || '' })}>
            <option>Year 1</option><option>Year 2</option><option>Year 3</option><option>Year 4</option><option>Year 4.5</option>
          </select>
          <button type="button" className="button secondary" onClick={() => setForm((prev) => ({ ...prev, content: presetByYear[prev.yearLabel] || '' }))}>Use suggested template</button>
        </div>
        <textarea rows="7" placeholder="Detailed learning path content" value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} />
        <div className="page-actions">
          <button className="button secondary" type="button" onClick={() => { setEditingId(null); setForm({ majorId: selectedMajorId, yearLabel: 'Year 1', content: '' }) }}>Clear</button>
          <button className="button primary">{editingId ? 'Update Path' : 'Add Path'}</button>
        </div>
      </form>
      <div className="card form-card"><input placeholder="Search year label or learning content" value={query} onChange={(e) => setQuery(e.target.value)} /></div>
      <div className="card table-card">
        <table>
          <thead><tr><th>Year</th><th>Content</th><th /></tr></thead>
          <tbody>
            {filtered.map((row) => (
              <tr key={row.id}>
                <td>{row.year_label}</td><td>{row.content}</td>
                <td>
                  <div className="page-actions compact-actions">
                    <button className="button secondary small" onClick={() => { setEditingId(row.id); setForm({ majorId: String(row.major_id), yearLabel: row.year_label, content: row.content }) }}>Edit</button>
                    <button className="button secondary small" onClick={() => { deleteLearningPathApi(row.id).then(load) }}>Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 ? <p className="muted">No learning path entries matched this search.</p> : null}
      </div>
    </div>
  )
}

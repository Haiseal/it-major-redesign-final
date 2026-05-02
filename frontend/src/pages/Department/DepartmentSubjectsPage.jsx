import { useEffect, useMemo, useState } from 'react'
import PageHeader from '../../components/PageHeader'
import LoadingState from '../../components/LoadingState'
import { createSubjectApi, deleteSubjectApi, getSubjectsApi, updateSubjectApi } from '../../api/departmentAdminApi'

const categoryOptions = [
  'foundation_math',
  'foundation_science',
  'it_core',
  'hardware_core',
  'software_core',
  'english',
  'lab',
  'systems',
  'security',
  'data_systems',
  'data_ai',
  'information_systems',
  'professional',
  'internship',
  'capstone',
  'physical_training',
]

const emptyForm = {
  subjectCode: '',
  name: '',
  category: 'it_core',
  creditsTotal: '',
  creditsLecture: '',
  creditsLab: '',
  studyYear: 1,
  studySemester: 1,
  programTrack: 'common',
  isYear1Input: false,
  isUsedInAlgorithm: true,
  displayOrder: 999,
}

function normalizePayload(form) {
  const toNumberOrNull = (value) => (value === '' || value === null || value === undefined ? null : Number(value))
  return {
    subjectCode: form.subjectCode.trim(),
    name: form.name.trim(),
    category: form.category,
    creditsTotal: toNumberOrNull(form.creditsTotal),
    creditsLecture: toNumberOrNull(form.creditsLecture),
    creditsLab: toNumberOrNull(form.creditsLab),
    studyYear: toNumberOrNull(form.studyYear),
    studySemester: toNumberOrNull(form.studySemester),
    programTrack: form.programTrack?.trim() || null,
    isYear1Input: Boolean(form.isYear1Input),
    isUsedInAlgorithm: Boolean(form.isUsedInAlgorithm),
    displayOrder: toNumberOrNull(form.displayOrder) ?? 999,
  }
}

export default function DepartmentSubjectsPage() {
  const [rows, setRows] = useState(null)
  const [form, setForm] = useState(emptyForm)
  const [editingId, setEditingId] = useState(null)
  const [query, setQuery] = useState('')

  const load = () => getSubjectsApi().then((res) => setRows(res.data))
  useEffect(() => { load() }, [])
  const filteredRows = useMemo(() => (rows || []).filter((row) => `${row.subject_code} ${row.name} ${row.category} ${row.program_track || ''}`.toLowerCase().includes(query.toLowerCase())), [rows, query])
  if (!rows) return <LoadingState text="Loading subjects..." />

  const submit = async (e) => {
    e.preventDefault()
    const payload = normalizePayload(form)
    if (editingId) await updateSubjectApi(editingId, payload)
    else await createSubjectApi(payload)
    setForm(emptyForm)
    setEditingId(null)
    load()
  }

  return (
    <div className="stack-lg">
      <PageHeader title="Subject Management" subtitle="Maintain the full HCMIU IT subject catalogue, including Year 1 input flags and detailed metadata." />
      <form className="card form-card" onSubmit={submit}>
        <div className="form-grid four">
          <input placeholder="Code" value={form.subjectCode} onChange={(e) => setForm({ ...form, subjectCode: e.target.value })} />
          <input placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
            {categoryOptions.map((option) => <option key={option} value={option}>{option}</option>)}
          </select>
          <input placeholder="Program track" value={form.programTrack} onChange={(e) => setForm({ ...form, programTrack: e.target.value })} />
          <input type="number" step="0.1" placeholder="Total credits" value={form.creditsTotal} onChange={(e) => setForm({ ...form, creditsTotal: e.target.value })} />
          <input type="number" step="0.1" placeholder="Lecture credits" value={form.creditsLecture} onChange={(e) => setForm({ ...form, creditsLecture: e.target.value })} />
          <input type="number" step="0.1" placeholder="Lab credits" value={form.creditsLab} onChange={(e) => setForm({ ...form, creditsLab: e.target.value })} />
          <input type="number" placeholder="Display order" value={form.displayOrder} onChange={(e) => setForm({ ...form, displayOrder: e.target.value })} />
          <input type="number" placeholder="Study year" value={form.studyYear} onChange={(e) => setForm({ ...form, studyYear: e.target.value })} />
          <input type="number" placeholder="Study semester" value={form.studySemester} onChange={(e) => setForm({ ...form, studySemester: e.target.value })} />
          <label className="checkbox-row"><input type="checkbox" checked={form.isYear1Input} onChange={(e) => setForm({ ...form, isYear1Input: e.target.checked })} /> Year 1 assessment input</label>
          <label className="checkbox-row"><input type="checkbox" checked={form.isUsedInAlgorithm} onChange={(e) => setForm({ ...form, isUsedInAlgorithm: e.target.checked })} /> Used in algorithm</label>
        </div>
        <div className="page-actions">
          <button className="button secondary" type="button" onClick={() => { setForm(emptyForm); setEditingId(null) }}>Clear</button>
          <button className="button primary">{editingId ? 'Update Subject' : 'Add Subject'}</button>
        </div>
      </form>
      <div className="card form-card"><input placeholder="Search subject by code, name, category, or track" value={query} onChange={(e) => setQuery(e.target.value)} /></div>
      <div className="card table-card">
        <table>
          <thead><tr><th>Code</th><th>Name</th><th>Category</th><th>Track</th><th>Year/Sem</th><th>Y1</th><th>Used</th><th /></tr></thead>
          <tbody>
            {filteredRows.map((row) => (
              <tr key={row.id}>
                <td>{row.subject_code}</td>
                <td>{row.name}</td>
                <td>{row.category}</td>
                <td>{row.program_track || '—'}</td>
                <td>{row.study_year || '—'} / {row.study_semester || '—'}</td>
                <td>{row.is_year1_input ? 'Yes' : 'No'}</td>
                <td>{row.is_used_in_algorithm ? 'On' : 'Off'}</td>
                <td>
                  <div className="page-actions compact-actions">
                    <button className="button secondary small" onClick={() => { setEditingId(row.id); setForm({ subjectCode: row.subject_code, name: row.name, category: row.category, creditsTotal: row.credits_total ?? '', creditsLecture: row.credits_lecture ?? '', creditsLab: row.credits_lab ?? '', studyYear: row.study_year ?? '', studySemester: row.study_semester ?? '', programTrack: row.program_track ?? '', isYear1Input: Boolean(row.is_year1_input), isUsedInAlgorithm: Boolean(row.is_used_in_algorithm), displayOrder: row.display_order ?? 999 }) }}>Edit</button>
                    <button className="button secondary small" onClick={() => { deleteSubjectApi(row.id).then(load) }}>Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredRows.length === 0 ? <p className="muted">No subjects matched your search.</p> : null}
      </div>
    </div>
  )
}

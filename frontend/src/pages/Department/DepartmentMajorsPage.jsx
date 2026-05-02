import { useEffect, useMemo, useState } from 'react'
import PageHeader from '../../components/PageHeader'
import LoadingState from '../../components/LoadingState'
import { createMajorApi, deleteMajorApi, getMajorsApi, updateMajorApi } from '../../api/departmentAdminApi'

const emptyForm = { code: '', name: '', description: '' }

export default function DepartmentMajorsPage() {
  const [rows, setRows] = useState(null)
  const [form, setForm] = useState(emptyForm)
  const [editingId, setEditingId] = useState(null)
  const [query, setQuery] = useState('')

  const load = () => getMajorsApi().then((res) => setRows(res.data))
  useEffect(() => { load() }, [])
  const filteredRows = useMemo(() => (rows || []).filter((row) => `${row.code} ${row.name} ${row.description || ''}`.toLowerCase().includes(query.toLowerCase())), [rows, query])
  if (!rows) return <LoadingState text="Loading majors..." />

  const submit = async (e) => {
    e.preventDefault()
    if (editingId) await updateMajorApi(editingId, form)
    else await createMajorApi(form)
    setForm(emptyForm)
    setEditingId(null)
    load()
  }

  return (
    <div className="stack-lg">
      <PageHeader title="Major Management" subtitle="Create, edit, delete, and search majors." />
      <form className="card form-card" onSubmit={submit}>
        <div className="form-grid three">
          <input placeholder="Code" value={form.code} onChange={(e) => setForm({ ...form, code: e.target.value })} />
          <input placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <input placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
        </div>
        <div className="page-actions">
          <button className="button secondary" type="button" onClick={() => { setForm(emptyForm); setEditingId(null) }}>Clear</button>
          <button className="button primary">{editingId ? 'Update Major' : 'Add Major'}</button>
        </div>
      </form>
      <div className="card form-card"><input placeholder="Search major by code, name, or description" value={query} onChange={(e) => setQuery(e.target.value)} /></div>
      <div className="card table-card">
        <table>
          <thead><tr><th>Code</th><th>Name</th><th>Description</th><th /></tr></thead>
          <tbody>
            {filteredRows.map((row) => (
              <tr key={row.id}>
                <td>{row.code}</td><td>{row.name}</td><td>{row.description}</td>
                <td>
                  <div className="page-actions compact-actions">
                    <button className="button secondary small" onClick={() => { setEditingId(row.id); setForm({ code: row.code, name: row.name, description: row.description || '' }) }}>Edit</button>
                    <button className="button secondary small" onClick={() => { deleteMajorApi(row.id).then(load) }}>Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredRows.length === 0 ? <p className="muted">No majors matched your search.</p> : null}
      </div>
    </div>
  )
}

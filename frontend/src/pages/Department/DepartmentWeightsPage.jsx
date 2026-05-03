import { useEffect, useMemo, useState } from 'react'
import PageHeader from '../../components/PageHeader'
import LoadingState from '../../components/LoadingState'
import {
  getMajorsApi,
  getWeightsByMajorApi,
  updateWeightApi,
  initMajorWeightsApi,
  addFoundationSubjectApi,
  removeFoundationSubjectApi,
} from '../../api/departmentAdminApi'

export default function DepartmentWeightsPage() {
  const [majors, setMajors] = useState(null)
  const [majorId, setMajorId] = useState('')
  const [tab, setTab] = useState('foundation')
  const [weights, setWeights] = useState(null)
  const [query, setQuery] = useState('')
  const [initing, setIniting] = useState(false)

  // State for adding a new subject
  const [selectedSubjectId, setSelectedSubjectId] = useState('')
  const [addWeight, setAddWeight] = useState('1.0')
  const [adding, setAdding] = useState(false)

  useEffect(() => {
    getMajorsApi().then((res) => {
      setMajors(res.data)
      if (res.data[0]) setMajorId(String(res.data[0].id))
    })
  }, [])

  const loadWeights = (id) => {
    setWeights(null)
    getWeightsByMajorApi(id).then((res) => {
      setWeights(res.data)
      setSelectedSubjectId('')
    })
  }

  useEffect(() => {
    if (majorId) loadWeights(majorId)
  }, [majorId])

  const rows = useMemo(() => {
    if (!weights) return []
    if (tab === 'foundation') return weights.foundation || []
    if (tab === 'interests') return weights.interests || []
    return weights.selfAssessments || []
  }, [weights, tab])

  const filteredRows = useMemo(() => {
    const keyword = query.toLowerCase().trim()
    return rows.filter((row) =>
      `${row.subject_code || ''} ${row.name || ''} ${row.question_text || ''}`.toLowerCase().includes(keyword)
    )
  }, [rows, query])

  const save = async (type, id, value) => {
    await updateWeightApi(type, id, { weight: Number(value) })
    loadWeights(majorId)
  }

  const handleInit = async () => {
    setIniting(true)
    try {
      await initMajorWeightsApi(majorId)
      loadWeights(majorId)
    } finally {
      setIniting(false)
    }
  }

  const handleAddSubject = async () => {
    if (!selectedSubjectId) return
    setAdding(true)
    try {
      await addFoundationSubjectApi({
        majorId: Number(majorId),
        subjectId: Number(selectedSubjectId),
        weight: Number(addWeight) || 1.0,
      })
      setAddWeight('1.0')
      loadWeights(majorId)
    } finally {
      setAdding(false)
    }
  }

  const handleRemoveSubject = async (entryId) => {
    if (!confirm('Xóa môn học này khỏi major?')) return
    await removeFoundationSubjectApi(entryId)
    loadWeights(majorId)
  }

  const isEmpty =
    weights &&
    (weights.foundation || []).length === 0 &&
    (weights.interests || []).length === 0 &&
    (weights.selfAssessments || []).length === 0

  const availableSubjects = weights?.availableSubjects || []

  if (!majors) return <LoadingState text="Loading weights..." />

  return (
    <div className="stack-lg">
      <PageHeader
        title="Weight Management"
        subtitle="Edit academic, interest, and future-goal weights by major."
      />

      <div className="card form-card">
        <div className="page-actions">
          <select value={majorId} onChange={(e) => { setMajorId(e.target.value); setTab('foundation') }}>
            {majors.map((major) => (
              <option key={major.id} value={major.id}>{major.name}</option>
            ))}
          </select>

          <button
            className={tab === 'foundation' ? 'button primary' : 'button secondary'}
            onClick={() => setTab('foundation')}
          >
            Academic weights
          </button>
          <button
            className={tab === 'interests' ? 'button primary' : 'button secondary'}
            onClick={() => setTab('interests')}
          >
            Interest weights
          </button>
          <button
            className={tab === 'selfAssessments' ? 'button primary' : 'button secondary'}
            onClick={() => setTab('selfAssessments')}
          >
            Future-goal weights
          </button>
        </div>

        <div className="field-group" style={{ marginTop: 12 }}>
          <input
            placeholder="Search by subject, interest, or question"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Empty state — show Initialize button */}
      {weights && isEmpty && (
        <div className="card form-card" style={{ textAlign: 'center', padding: '2rem' }}>
          <p className="muted" style={{ marginBottom: 12 }}>
            This major has no weights yet. Click to initialize all subjects, interests, and questions.
          </p>
          <button className="button primary" onClick={handleInit} disabled={initing}>
            {initing ? 'Đang khởi tạo...' : 'Khởi tạo Weights'}
          </button>
        </div>
      )}

      {/* Add subject panel — only shown in foundation tab */}
      {weights && !isEmpty && tab === 'foundation' && (
        <div className="card form-card">
          <p style={{ fontWeight: 600, marginBottom: 8 }}>Add Subject to Major</p>
          {availableSubjects.length === 0 ? (
            <p className="muted">All subjects have been added to this major.</p>
          ) : (
            <div className="page-actions">
              <select
                value={selectedSubjectId}
                onChange={(e) => setSelectedSubjectId(e.target.value)}
                style={{ flex: 2 }}
              >
                <option value="">-- Select Subject --</option>
                {availableSubjects.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.subject_code} · {s.name}
                  </option>
                ))}
              </select>
              <input
                type="number"
                step="0.1"
                min="0"
                placeholder="Weight"
                value={addWeight}
                onChange={(e) => setAddWeight(e.target.value)}
                style={{ width: 90 }}
              />
              <button
                className="button primary"
                onClick={handleAddSubject}
                disabled={adding || !selectedSubjectId}
              >
                {adding ? 'Adding...' : 'Add Subject'}
              </button>
            </div>
          )}
        </div>
      )}

      {!weights && majorId && <LoadingState text="Loading..." />}

      {weights && !isEmpty && (
        <div className="card table-card">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Weight</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {filteredRows.map((row) => (
                <WeightRow
                  key={row.id}
                  row={row}
                  type={tab}
                  onSave={save}
                  onRemove={tab === 'foundation' ? handleRemoveSubject : null}
                />
              ))}
            </tbody>
          </table>
          {filteredRows.length === 0 && (
            <p className="muted">No matching results found.</p>
          )}
        </div>
      )}
    </div>
  )
}

function WeightRow({ row, type, onSave, onRemove }) {
  const [value, setValue] = useState(row.weight)

  const label = row.subject_code
    ? `${row.subject_code} · ${row.name}`
    : row.name || row.question_text

  return (
    <tr>
      <td>{label}</td>
      <td>
        <input
          type="number"
          step="0.1"
          min="0"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          style={{ width: 90 }}
        />
      </td>
      <td>
        <div className="page-actions compact-actions">
          <button className="button secondary small" onClick={() => onSave(type, row.id, value)}>
            Save
          </button>
          {onRemove && (
            <button className="button secondary small" onClick={() => onRemove(row.id)}>
              Remove
            </button>
          )}
        </div>
      </td>
    </tr>
  )
}

import { useEffect, useMemo, useState } from 'react'
import PageHeader from '../../components/PageHeader'
import LoadingState from '../../components/LoadingState'
import { getMajorsApi, getWeightsByMajorApi, updateWeightApi } from '../../api/departmentAdminApi'

export default function DepartmentWeightsPage() {
  const [majors, setMajors] = useState(null)
  const [majorId, setMajorId] = useState('')
  const [tab, setTab] = useState('foundation')
  const [weights, setWeights] = useState(null)
  const [query, setQuery] = useState('')

  useEffect(() => {
    getMajorsApi().then((res) => {
      setMajors(res.data)
      if (res.data[0]) setMajorId(String(res.data[0].id))
    })
  }, [])

  useEffect(() => {
    if (majorId) {
      getWeightsByMajorApi(majorId).then((res) => setWeights(res.data))
    }
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
      `${row.subject_code || ''} ${row.name || ''} ${row.question_text || ''}`
        .toLowerCase()
        .includes(keyword)
    )
  }, [rows, query])

  const save = async (type, id, value) => {
    await updateWeightApi(type, id, { weight: Number(value) })
    const { data } = await getWeightsByMajorApi(majorId)
    setWeights(data)
  }

  if (!majors || !weights) {
    return <LoadingState text="Loading weights..." />
  }

  return (
    <div className="stack-lg">
      <PageHeader
        title="Weight Management"
        subtitle="Edit academic, interest, and future-goal weights by major, with search support."
      />

      <div className="card form-card">
        <div className="page-actions">
          <select value={majorId} onChange={(e) => setMajorId(e.target.value)}>
            {majors.map((major) => (
              <option key={major.id} value={major.id}>
                {major.name}
              </option>
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
          <label>Search weight row</label>
          <input
            placeholder="Search by subject, interest, or question"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>

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
              <WeightRow key={row.id} row={row} type={tab} onSave={save} />
            ))}
          </tbody>
        </table>

        {filteredRows.length === 0 ? (
          <p className="muted">No weights matched your search.</p>
        ) : null}
      </div>
    </div>
  )
}

function WeightRow({ row, type, onSave }) {
  const [value, setValue] = useState(row.weight)

  return (
    <tr>
      <td>{row.subject_code ? `${row.subject_code} · ${row.name}` : row.name || row.question_text}</td>
      <td>
        <input
          type="number"
          step="0.1"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </td>
      <td>
        <button
          className="button secondary small"
          onClick={() => onSave(type, row.id, value)}
        >
          Save
        </button>
      </td>
    </tr>
  )
}
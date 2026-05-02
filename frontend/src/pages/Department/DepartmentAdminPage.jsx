import { useEffect, useState } from 'react'
import {
  createLearningPathApi, createSubjectApi, deleteLearningPathApi, deleteSubjectApi,
  getLearningPathsByMajorApi, getMajorsApi, getSubjectsApi, getWeightsByMajorApi,
  updateLearningPathApi, updateSubjectApi, updateWeightApi
} from '../../api/departmentAdminApi'
import SectionCard from '../../components/SectionCard'

export default function DepartmentAdminPage() {
  const [majors, setMajors] = useState([])
  const [selectedMajorId, setSelectedMajorId] = useState('')
  const [subjects, setSubjects] = useState([])
  const [learningPaths, setLearningPaths] = useState([])
  const [weights, setWeights] = useState({ foundation: [], interests: [], selfAssessments: [] })
  const [subjectForm, setSubjectForm] = useState({ subjectCode: '', name: '', category: 'core', isUsedInAlgorithm: true })

  const load = async (majorId = selectedMajorId) => {
    const [majorsRes, subjectsRes] = await Promise.all([getMajorsApi(), getSubjectsApi()])
    setMajors(majorsRes.data)
    setSubjects(subjectsRes.data)
    const targetMajorId = majorId || majorsRes.data[0]?.id
    if (targetMajorId) {
      setSelectedMajorId(String(targetMajorId))
      const [pathsRes, weightsRes] = await Promise.all([getLearningPathsByMajorApi(targetMajorId), getWeightsByMajorApi(targetMajorId)])
      setLearningPaths(pathsRes.data)
      setWeights(weightsRes.data)
    }
  }

  useEffect(() => { load() }, [])
  useEffect(() => { if (selectedMajorId) load(selectedMajorId) }, [selectedMajorId])

  return (
    <div className="stack-lg">
      <SectionCard title="Department dashboard" subtitle="The department role now manages academic content more like a real configuration workspace.">
        <div className="grid-3">
          <div className="score-box"><span>Majors</span><strong>{majors.length}</strong></div>
          <div className="score-box"><span>Subjects</span><strong>{subjects.length}</strong></div>
          <div className="score-box"><span>Learning paths</span><strong>{learningPaths.length}</strong></div>
        </div>
      </SectionCard>

      <SectionCard title="Selected major" subtitle="Choose a major to edit learning paths and weights.">
        <select value={selectedMajorId} onChange={(e) => setSelectedMajorId(e.target.value)}>{majors.map((major) => <option key={major.id} value={major.id}>{major.code} - {major.name}</option>)}</select>
      </SectionCard>

      <div className="grid-2">
        <SectionCard title="Subject CRUD" subtitle="Create, update, delete, and control whether a subject is used by the algorithm.">
          <form className="grid-2" onSubmit={async (e) => { e.preventDefault(); await createSubjectApi(subjectForm); setSubjectForm({ subjectCode: '', name: '', category: 'core', isUsedInAlgorithm: true }); load() }}>
            <div className="field-group"><label>Code</label><input value={subjectForm.subjectCode} onChange={(e) => setSubjectForm({ ...subjectForm, subjectCode: e.target.value })} required /></div>
            <div className="field-group"><label>Name</label><input value={subjectForm.name} onChange={(e) => setSubjectForm({ ...subjectForm, name: e.target.value })} required /></div>
            <div className="field-group"><label>Category</label><select value={subjectForm.category} onChange={(e) => setSubjectForm({ ...subjectForm, category: e.target.value })}><option>core</option><option>optional</option><option>general</option></select></div>
            <div className="field-group"><label>Used in algorithm</label><select value={String(subjectForm.isUsedInAlgorithm)} onChange={(e) => setSubjectForm({ ...subjectForm, isUsedInAlgorithm: e.target.value === 'true' })}><option value="true">Yes</option><option value="false">No</option></select></div>
            <div className="hero-actions"><button className="button primary">Create subject</button></div>
          </form>
          <div className="stack-sm" style={{ marginTop: 14 }}>
            {subjects.map((subject) => (
              <div key={subject.id} className="card muted-card">
                <div className="field-row compact-field"><span>{subject.subject_code} - {subject.name}</span><strong>{subject.category}</strong></div>
                <div className="hero-actions">
                  <button className="button secondary" onClick={async () => { await updateSubjectApi(subject.id, { subjectCode: subject.subject_code, name: subject.name, category: subject.category, isUsedInAlgorithm: !subject.is_used_in_algorithm }); load() }}>Toggle algorithm use</button>
                  <button className="button danger" onClick={async () => { await deleteSubjectApi(subject.id); load() }}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Learning path CRUD" subtitle="Add, edit, and delete year-based learning path entries.">
          <div className="hero-actions"><button className="button secondary" onClick={async () => { await createLearningPathApi({ majorId: Number(selectedMajorId), yearLabel: 'Year X', content: 'New learning path entry.' }); load(selectedMajorId) }}>Add learning path</button></div>
          <div className="stack-sm" style={{ marginTop: 14 }}>
            {learningPaths.map((item) => (
              <div key={item.id} className="card muted-card">
                <input value={item.year_label} onChange={(e) => setLearningPaths((prev) => prev.map((p) => p.id === item.id ? { ...p, year_label: e.target.value } : p))} />
                <textarea rows="4" value={item.content} onChange={(e) => setLearningPaths((prev) => prev.map((p) => p.id === item.id ? { ...p, content: e.target.value } : p))} />
                <div className="hero-actions"><button className="button primary" onClick={async () => { await updateLearningPathApi(item.id, { yearLabel: item.year_label, content: item.content }); load(selectedMajorId) }}>Save</button><button className="button danger" onClick={async () => { await deleteLearningPathApi(item.id); load(selectedMajorId) }}>Delete</button></div>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>

      <SectionCard title="Weight mapping management" subtitle="You can now change the recommendation configuration instead of only viewing it.">
        <div className="stack-sm">
          {['foundation', 'interests', 'selfAssessments'].map((type) => (
            <div key={type}>
              <h3>{type}</h3>
              {(weights[type] || []).map((item) => (
                <div key={item.id} className="field-row compact-field">
                  <span>{item.subject_code ? `${item.subject_code} - ${item.name}` : item.question_text || item.name}</span>
                  <div className="hero-actions"><input style={{ width: 90 }} type="number" step="0.1" value={item.weight} onChange={(e) => setWeights((prev) => ({ ...prev, [type]: prev[type].map((p) => p.id === item.id ? { ...p, weight: e.target.value } : p) }))} /><button className="button secondary" onClick={async () => { await updateWeightApi(type, item.id, { weight: item.weight }); load(selectedMajorId) }}>Save</button></div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </SectionCard>
    </div>
  )
}

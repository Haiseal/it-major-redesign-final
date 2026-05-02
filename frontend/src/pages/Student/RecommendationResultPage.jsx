import { useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import PageHeader from '../../components/PageHeader'
import LoadingState from '../../components/LoadingState'
import { getRecommendationResult } from '../../api/recommendationApi'
import { createAdvisorNoteApi, deleteAdvisorNoteApi, updateAdvisorNoteApi, updateReviewStatusApi } from '../../api/advisorApi'
import { useAuth } from '../../contexts/AuthContext'

export default function RecommendationResultPage() {
  const { runId } = useParams()
  const { user } = useAuth()
  const [data, setData] = useState(null)
  const [noteText, setNoteText] = useState('')
  const [editingNoteId, setEditingNoteId] = useState(null)
  const [editingText, setEditingText] = useState('')
  const [noteQuery, setNoteQuery] = useState('')

  const load = () => getRecommendationResult(runId).then((res) => setData(res.data))
  useEffect(() => { load() }, [runId])

  const top = data?.results?.[0]
  const learningPath = useMemo(() => (data?.learningPaths || []).filter((item) => item.major_code === top?.major_code), [data, top])
  const filteredNotes = useMemo(() => (data?.notes || []).filter((note) => `${note.advisor_name} ${note.note_text}`.toLowerCase().includes(noteQuery.toLowerCase())), [data, noteQuery])

  if (!data) return <LoadingState text="Loading recommendation result..." />

  const handleCreateNote = async () => {
    if (!noteText.trim()) return
    await createAdvisorNoteApi({ runId, noteText })
    setNoteText('')
    await updateReviewStatusApi(runId, { reviewStatus: 'Reviewed' })
    load()
  }

  const handleSaveEdit = async () => {
    if (!editingText.trim()) return
    await updateAdvisorNoteApi(editingNoteId, { noteText: editingText })
    setEditingNoteId(null)
    setEditingText('')
    load()
  }

  const handleDelete = async (noteId) => {
    await deleteAdvisorNoteApi(noteId)
    load()
  }

  return (
    <div className="stack-lg">
      <PageHeader
        title="Recommendation Result"
        subtitle={`Assessment run #${runId}`}
        actions={<Link className="button secondary" to={user.role === 'student' ? '/student/history' : user.role === 'advisor' ? '/advisor/students' : '/'}>Back</Link>}
      />

      <div className="card hero-result">
        <div>
          <div className="hero-eyebrow">Top major</div>
          <h2>{top?.major_name}</h2>
          <p>{top?.explanation}</p>
        </div>
        <div className="hero-score">
          <div className="score-number">{top?.total_score}</div>
          <div>{top?.level} confidence</div>
        </div>
      </div>

      <div className="stats-grid three">
        {data.results.map((item) => (
          <div key={item.id} className="card rank-card">
            <div className="hero-eyebrow">Rank {item.ranking_position}</div>
            <h3>{item.major_name}</h3>
            <p>{item.total_score} points</p>
            <span className="badge">{item.level}</span>
          </div>
        ))}
      </div>

      <div className="stats-grid two">
        <div className="card">
          <h3>Breakdown</h3>
          {top ? [['Academic', top.academic_score], ['Interest', top.interest_score], ['Future goals', top.self_assessment_score]].map(([label, value]) => (
            <div key={label} className="bar-row">
              <span>{label}</span>
              <div className="bar-track"><div className="bar-fill" style={{ width: `${value}%` }} /></div>
              <strong>{value}</strong>
            </div>
          )) : null}
        </div>

        <div className="card">
          <h3>Weakness / improvement areas</h3>
          <ul>
            {top?.weakness_suggestion?.split('. ').filter(Boolean).map((item, idx) => <li key={idx}>{item.replace(/\.$/, '')}</li>)}
          </ul>
        </div>
      </div>

      <div className="stats-grid two">
        <div className="card">
          <h3>Input summary</h3>
          <div className="stack-sm">
            {data.inputs.subjectScores.map((item) => <div key={item.name} className="simple-row"><span>{item.subject_code} · {item.name}</span><strong>{item.score}</strong></div>)}
          </div>
        </div>
        <div className="card">
          <h3>Learning path</h3>
          <div className="stack-sm">
            {learningPath.map((item) => (
              <div key={item.id} className="timeline-item">
                <strong>{item.year_label}</strong>
                <p>{item.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="card">
        <div className="page-actions" style={{ justifyContent: 'space-between', alignItems: 'center' }}>
          <h3>Advisor notes</h3>
          <input style={{ maxWidth: 320 }} placeholder="Search advisor note" value={noteQuery} onChange={(e) => setNoteQuery(e.target.value)} />
        </div>
        <div className="stack-sm">
          {filteredNotes.map((note) => (
            <div key={note.id} className="note-item">
              <div className="note-meta"><strong>{note.advisor_name}</strong><span>{new Date(note.created_at).toLocaleString()}</span></div>
              {editingNoteId === note.id ? (
                <>
                  <textarea value={editingText} onChange={(e) => setEditingText(e.target.value)} rows="3" />
                  <div className="page-actions">
                    <button className="button secondary" onClick={() => setEditingNoteId(null)}>Cancel</button>
                    <button className="button primary" onClick={handleSaveEdit}>Save</button>
                  </div>
                </>
              ) : <p>{note.note_text}</p>}
              {user.role === 'advisor' ? (
                <div className="page-actions">
                  <button className="button secondary" onClick={() => { setEditingNoteId(note.id); setEditingText(note.note_text) }}>Edit</button>
                  <button className="button secondary" onClick={() => handleDelete(note.id)}>Delete</button>
                </div>
              ) : null}
            </div>
          ))}
          {filteredNotes.length === 0 ? <p>No advisor notes matched this search.</p> : null}
        </div>

        {user.role === 'advisor' ? (
          <div className="advisor-note-form">
            <textarea rows="4" value={noteText} onChange={(e) => setNoteText(e.target.value)} placeholder="Write advisor feedback..." />
            <button className="button primary" onClick={handleCreateNote}>Add Note</button>
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default function RankingCard({ item }) {
  return (
    <div className="result-card">
      <div className="result-header">
        <div>
          <p className="eyebrow">Rank #{item.ranking_position}</p>
          <h3>{item.major_name || item.majorName}</h3>
        </div>
        <span className={`badge badge-${(item.level || 'Low').toLowerCase()}`}>
          {item.level}
        </span>
      </div>

      <div className="score-grid">
        <div className="score-box">
          <span>Total</span>
          <strong>{item.total_score || item.totalScore}%</strong>
        </div>
        <div className="score-box">
          <span>Academic</span>
          <strong>{item.academic_score || item.academicScore}%</strong>
        </div>
        <div className="score-box">
          <span>Interest</span>
          <strong>{item.interest_score || item.interestScore}%</strong>
        </div>
        <div className="score-box">
          <span>Self-assessment</span>
          <strong>{item.self_assessment_score || item.selfAssessmentScore}%</strong>
        </div>
      </div>

      <div className="stack-sm">
        <div>
          <h4>Explanation</h4>
          <p>{item.explanation}</p>
        </div>
        <div>
          <h4>Weakness + Suggestion</h4>
          <p>{item.weakness_suggestion || item.weaknessSuggestion}</p>
        </div>
      </div>
    </div>
  )
}

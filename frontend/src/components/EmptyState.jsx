export default function EmptyState({ title = 'No data yet', description = 'Nothing to show here.' }) {
  return (
    <div className="card empty-state">
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  )
}

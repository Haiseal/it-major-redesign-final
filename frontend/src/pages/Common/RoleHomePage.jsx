import { Link } from 'react-router-dom'
import PageHeader from '../../components/PageHeader'

const configByRole = {
  student: {
    eyebrow: 'Student home',
    title: 'Student Home',
    subtitle: 'Use this space to start a new assessment, review your latest recommendation, and manage your profile.',
    actions: [
      { label: 'Start Assessment', to: '/student/assessment', primary: true },
      { label: 'Open Dashboard', to: '/student/dashboard' },
    ],
    cards: [
      { title: 'Assessment', text: 'Submit your subject scores, interests, and self-assessment in one focused workflow.', to: '/student/assessment' },
      { title: 'History', text: 'Review previous recommendation runs and compare results over time.', to: '/student/history' },
      { title: 'Profile', text: 'Maintain your student profile so the system looks more realistic and complete.', to: '/student/profile' },
    ],
  },
  advisor: {
    eyebrow: 'Advisor home',
    title: 'Advisor Home',
    subtitle: 'Review student recommendation runs, leave feedback, and monitor pending advising activity.',
    actions: [
      { label: 'Open Dashboard', to: '/advisor/dashboard', primary: true },
      { label: 'View Students', to: '/advisor/students' },
    ],
    cards: [
      { title: 'Dashboard', text: 'See total students, pending reviews, and recent advising activity.', to: '/advisor/dashboard' },
      { title: 'Student List', text: 'Open the list of submitted assessments that need advisor review.', to: '/advisor/students' },
    ],
  },
  department_admin: {
    eyebrow: 'Department home',
    title: 'Department Home',
    subtitle: 'Manage the academic configuration behind the recommendation system.',
    actions: [
      { label: 'Open Dashboard', to: '/department/dashboard', primary: true },
      { label: 'Manage Majors', to: '/department/majors' },
    ],
    cards: [
      { title: 'Majors', text: 'Create and maintain majors shown in recommendation results.', to: '/department/majors' },
      { title: 'Subjects', text: 'Control which subjects are visible and whether they are used in the algorithm.', to: '/department/subjects' },
      { title: 'Learning Paths', text: 'Edit Year 2–4 learning path recommendations by major.', to: '/department/learning-paths' },
      { title: 'Weights', text: 'Adjust academic, interest, and self-assessment weights separately.', to: '/department/weights' },
    ],
  },
  system_admin: {
    eyebrow: 'System home',
    title: 'System Home',
    subtitle: 'Manage platform users, statuses, and role assignments across the whole demo.',
    actions: [
      { label: 'Open Dashboard', to: '/system/dashboard', primary: true },
      { label: 'Manage Users', to: '/system/users' },
    ],
    cards: [
      { title: 'Dashboard', text: 'Review total users and distribution by role.', to: '/system/dashboard' },
      { title: 'User Management', text: 'Edit users, change roles, and activate or deactivate accounts.', to: '/system/users' },
    ],
  },
}

export default function RoleHomePage({ role }) {
  const config = configByRole[role]
  if (!config) return null

  return (
    <div className="stack-lg">
      <PageHeader
        eyebrow={config.eyebrow}
        title={config.title}
        subtitle={config.subtitle}
        actions={(
          <div className="page-actions">
            {config.actions.map((action) => (
              <Link key={action.to} className={`button ${action.primary ? 'primary' : 'secondary'}`} to={action.to}>{action.label}</Link>
            ))}
          </div>
        )}
      />

      <div className="stats-grid three">
        {config.cards.map((card) => (
          <div className="card quick-card" key={card.to}>
            <h3>{card.title}</h3>
            <p>{card.text}</p>
            <Link className="button secondary small" to={card.to}>Open</Link>
          </div>
        ))}
      </div>
    </div>
  )
}

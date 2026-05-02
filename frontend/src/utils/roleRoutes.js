export function getDefaultRouteByRole(role) {
  switch (role) {
    case 'student':
      return '/student/dashboard'
    case 'advisor':
      return '/advisor/dashboard'
    case 'department_admin':
      return '/department/dashboard'
    case 'system_admin':
      return '/system/dashboard'
    default:
      return '/login'
  }
}

export const sidebarByRole = {
  student: [
    { label: 'Dashboard', to: '/student/dashboard' },
    { label: 'Assessment', to: '/student/assessment' },
    { label: 'History', to: '/student/history' },
    { label: 'Profile', to: '/student/profile' },
  ],
  advisor: [
    { label: 'Dashboard', to: '/advisor/dashboard' },
    { label: 'Students', to: '/advisor/students' },
  ],
  department_admin: [
    { label: 'Dashboard', to: '/department/dashboard' },
    { label: 'Majors', to: '/department/majors' },
    { label: 'Subjects', to: '/department/subjects' },
    { label: 'Learning Paths', to: '/department/learning-paths' },
    { label: 'Weights', to: '/department/weights' },
  ],
  system_admin: [
    { label: 'Dashboard', to: '/system/dashboard' },
    { label: 'Users', to: '/system/users' },
  ],
}

import { createBrowserRouter, Navigate } from 'react-router-dom'
import HomePage from './pages/Common/HomePage'
import LoginPage from './pages/Common/LoginPage'
import RegisterPage from './pages/Common/RegisterPage'
import UnauthorizedPage from './pages/Common/UnauthorizedPage'
import RoleHomePage from './pages/Common/RoleHomePage'
import StudentProfilePage from './pages/Student/StudentProfilePage'
import StudentDashboardPage from './pages/Student/StudentDashboardPage'
import StudentAssessmentPage from './pages/Student/StudentAssessmentPage'
import RecommendationResultPage from './pages/Student/RecommendationResultPage'
import StudentHistoryPage from './pages/Student/StudentHistoryPage'
import AdvisorDashboardPage from './pages/Advisor/AdvisorDashboardPage'
import AdvisorStudentsPage from './pages/Advisor/AdvisorStudentsPage'
import AdvisorRunDetailPage from './pages/Advisor/AdvisorRunDetailPage'
import DepartmentDashboardPage from './pages/Department/DepartmentDashboardPage'
import DepartmentMajorsPage from './pages/Department/DepartmentMajorsPage'
import DepartmentSubjectsPage from './pages/Department/DepartmentSubjectsPage'
import DepartmentLearningPathsPage from './pages/Department/DepartmentLearningPathsPage'
import DepartmentWeightsPage from './pages/Department/DepartmentWeightsPage'
import SystemDashboardPage from './pages/System/SystemDashboardPage'
import SystemUsersPage from './pages/System/SystemUsersPage'
import AuthLayout from './layouts/AuthLayout'
import DashboardLayout from './layouts/DashboardLayout'
import ProtectedRoute from './components/ProtectedRoute'

export const router = createBrowserRouter([
  { path: '/', element: <HomePage /> },
  {
    element: <AuthLayout />,
    children: [
      { path: '/login', element: <LoginPage /> },
      { path: '/register', element: <RegisterPage /> },
      { path: '/unauthorized', element: <UnauthorizedPage /> },
    ],
  },
  {
    element: <DashboardLayout />,
    children: [
      { path: '/student/home', element: <Navigate to='/student/dashboard' replace /> },
      { path: '/student/dashboard', element: <ProtectedRoute roles={['student']}><StudentDashboardPage /></ProtectedRoute> },
      { path: '/student/assessment', element: <ProtectedRoute roles={['student']}><StudentAssessmentPage /></ProtectedRoute> },
      { path: '/student/history', element: <ProtectedRoute roles={['student']}><StudentHistoryPage /></ProtectedRoute> },
      { path: '/student/result/:runId', element: <ProtectedRoute roles={['student']}><RecommendationResultPage /></ProtectedRoute> },
      { path: '/student/profile', element: <ProtectedRoute roles={['student']}><StudentProfilePage /></ProtectedRoute> },

      { path: '/advisor/home', element: <Navigate to='/advisor/dashboard' replace /> },
      { path: '/advisor/dashboard', element: <ProtectedRoute roles={['advisor']}><AdvisorDashboardPage /></ProtectedRoute> },
      { path: '/advisor/students', element: <ProtectedRoute roles={['advisor']}><AdvisorStudentsPage /></ProtectedRoute> },
      { path: '/advisor/run/:runId', element: <ProtectedRoute roles={['advisor']}><AdvisorRunDetailPage /></ProtectedRoute> },

      { path: '/department/home', element: <Navigate to='/department/dashboard' replace /> },
      { path: '/department/dashboard', element: <ProtectedRoute roles={['department_admin']}><DepartmentDashboardPage /></ProtectedRoute> },
      { path: '/department/majors', element: <ProtectedRoute roles={['department_admin']}><DepartmentMajorsPage /></ProtectedRoute> },
      { path: '/department/subjects', element: <ProtectedRoute roles={['department_admin']}><DepartmentSubjectsPage /></ProtectedRoute> },
      { path: '/department/learning-paths', element: <ProtectedRoute roles={['department_admin']}><DepartmentLearningPathsPage /></ProtectedRoute> },
      { path: '/department/weights', element: <ProtectedRoute roles={['department_admin']}><DepartmentWeightsPage /></ProtectedRoute> },

      { path: '/system/home', element: <Navigate to='/system/dashboard' replace /> },
      { path: '/system/dashboard', element: <ProtectedRoute roles={['system_admin']}><SystemDashboardPage /></ProtectedRoute> },
      { path: '/system/users', element: <ProtectedRoute roles={['system_admin']}><SystemUsersPage /></ProtectedRoute> },
    ],
  },
  { path: '*', element: <Navigate to='/' replace /> },
])

import api from './http'

export const getAdvisorDashboardApi = () => api.get('/advisor/dashboard')
export const getAdvisorStudentsApi = () => api.get('/advisor/students')
export const createAdvisorNoteApi = (payload) => api.post('/advisor/notes', payload)
export const getAdvisorNotesApi = (runId) => api.get(`/advisor/notes/${runId}`)
export const updateAdvisorNoteApi = (noteId, payload) => api.put(`/advisor/notes/${noteId}`, payload)
export const deleteAdvisorNoteApi = (noteId) => api.delete(`/advisor/notes/${noteId}`)
export const updateReviewStatusApi = (runId, payload) => api.put(`/advisor/runs/${runId}/status`, payload)

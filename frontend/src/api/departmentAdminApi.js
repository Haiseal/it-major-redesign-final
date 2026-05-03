import api from './http'

export const getDepartmentDashboardApi = () => api.get('/department-admin/dashboard')
export const getMajorsApi = () => api.get('/department-admin/majors')
export const createMajorApi = (payload) => api.post('/department-admin/majors', payload)
export const updateMajorApi = (id, payload) => api.put(`/department-admin/majors/${id}`, payload)
export const deleteMajorApi = (id) => api.delete(`/department-admin/majors/${id}`)

export const getSubjectsApi = () => api.get('/department-admin/subjects')
export const createSubjectApi = (payload) => api.post('/department-admin/subjects', payload)
export const updateSubjectApi = (id, payload) => api.put(`/department-admin/subjects/${id}`, payload)
export const deleteSubjectApi = (id) => api.delete(`/department-admin/subjects/${id}`)

export const getLearningPathsApi = () => api.get('/department-admin/learning-paths')
export const getLearningPathsByMajorApi = (majorId) => api.get(`/department-admin/learning-paths/${majorId}`)
export const createLearningPathApi = (payload) => api.post('/department-admin/learning-paths', payload)
export const updateLearningPathApi = (id, payload) => api.put(`/department-admin/learning-paths/${id}`, payload)
export const deleteLearningPathApi = (id) => api.delete(`/department-admin/learning-paths/${id}`)

export const getWeightsByMajorApi = (majorId) => api.get(`/department-admin/weights/${majorId}`)
export const updateWeightApi = (type, id, payload) => api.put(`/department-admin/weights/${type}/${id}`, payload)
export const initMajorWeightsApi = (majorId) => api.post(`/department-admin/weights/init/${majorId}`)
export const addFoundationSubjectApi = (payload) => api.post('/department-admin/weights/foundation', payload)
export const removeFoundationSubjectApi = (id) => api.delete(`/department-admin/weights/foundation/${id}`)

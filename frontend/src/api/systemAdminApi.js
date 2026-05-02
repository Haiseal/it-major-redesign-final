import api from './http'

export const getSystemDashboardApi = () => api.get('/system-admin/dashboard')
export const getUsersApi = () => api.get('/system-admin/users')
export const createUserApi = (payload) => api.post('/system-admin/users', payload)
export const updateUserApi = (id, payload) => api.put(`/system-admin/users/${id}`, payload)
export const deleteUserApi = (id) => api.delete(`/system-admin/users/${id}`)

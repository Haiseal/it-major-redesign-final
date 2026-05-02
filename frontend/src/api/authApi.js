import api from './http'

export const registerApi = (payload) => api.post('/auth/register', payload)
export const loginApi = (payload) => api.post('/auth/login', payload)
export const meApi = () => api.get('/auth/me')
export const updateProfileApi = (payload) => api.put('/auth/profile', payload)

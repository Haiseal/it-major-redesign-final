import api from './http'

export const getFormOptionsApi = () => api.get('/recommendations/form-options')
export const generateRecommendation = (payload) => api.post('/recommendations/generate', payload)
export const getRecommendationResult = (runId) => api.get(`/recommendations/${runId}`)
export const getRecommendationRuns = () => api.get('/recommendations/runs')

import api from './axios.js'

export const cakeService = {
  /** Fetch all available cake collections */
  getCollections: () => api.get('/cakes'),

  /** Fetch a single cake by slug */
  getCakeBySlug: (slug) => api.get(`/cakes/${slug}`),

  /** Submit a custom cake configuration for price estimation */
  estimatePrice: (config) => api.post('/cakes/estimate', config),
}

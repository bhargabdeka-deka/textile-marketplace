/**
 * src/services/product.service.js
 *
 * API call wrappers for product endpoints.
 * All functions return the unwrapped `data` field from the API envelope.
 */

import api from './axiosInstance';

const productService = {
  /**
   * getProducts — browse with search, filter, and pagination
   * @param {{ search, category, minPrice, maxPrice, inStock, page, limit, sort }} params
   */
  getProducts: async (params = {}) => {
    const response = await api.get('/products', { params });
    return response.data;
  },

  /**
   * getCategories — fetch the list of valid categories from the server
   */
  getCategories: async () => {
    const response = await api.get('/products/categories');
    return response.data;
  },

  /**
   * getProductById — fetch a single product with supplier details
   * @param {string} id
   */
  getProductById: async (id) => {
    const response = await api.get(`/products/${id}`);
    return response.data;
  },

  /**
   * createProduct — supplier: create a new listing
   * @param {FormData} formData — must include images as 'images' field
   */
  createProduct: async (formData) => {
    const response = await api.post('/products', formData, {
      headers: { 'Content-Type': undefined }
    });
    return response.data;
  },

  /**
   * updateProduct — supplier: update own product
   * @param {string}   id
   * @param {FormData} formData
   */
  updateProduct: async (id, formData) => {
    const response = await api.put(`/products/${id}`, formData, {
      headers: { 'Content-Type': undefined }
    });
    return response.data;
  },

  /**
   * deleteProduct — supplier: remove own product
   * @param {string} id
   */
  deleteProduct: async (id) => {
    const response = await api.delete(`/products/${id}`);
    return response.data;
  },

  // AI Natural Language Search
  aiSearch: async (query) => {
    const response = await api.post('/ai/search', { query });
    return response.data;
  },

  /**
   * getMyProducts — supplier: fetch all own listings (including inactive)
   * @param {{ page, limit, sort }} params
   */
  getMyProducts: async (params = {}) => {
    const response = await api.get('/products/my-products', { params });
    return response.data;
  },
};

export default productService;

const API_BASE_URL = 'http://localhost:8000/api';

/**
 * Helper to generate request headers with optional authorization token
 */
const getHeaders = () => {
  const headers = {
    'Content-Type': 'application/json',
  };
  const token = localStorage.getItem('token');
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
};

/**
 * Handle API responses
 */
const handleResponse = async (response) => {
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Something went wrong');
  }
  return data;
};

export const api = {
  // Auth API
  register: async (userData) => {
    const res = await fetch(`${API_BASE_URL}/users/register`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(userData),
    });
    return handleResponse(res);
  },

  login: async (credentials) => {
    const res = await fetch(`${API_BASE_URL}/users/login`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(credentials),
    });
    return handleResponse(res);
  },

  getProfile: async () => {
    const res = await fetch(`${API_BASE_URL}/users/profile`, {
      method: 'GET',
      headers: getHeaders(),
    });
    return handleResponse(res);
  },

  updateProfile: async (userData) => {
    const res = await fetch(`${API_BASE_URL}/users/profile`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(userData),
    });
    return handleResponse(res);
  },

  // Suggestions API
  createSuggestion: async () => {
    const res = await fetch(`${API_BASE_URL}/suggestions/create`, {
      method: 'POST',
      headers: getHeaders(),
    });
    return handleResponse(res);
  },

  getSuggestions: async () => {
    const res = await fetch(`${API_BASE_URL}/suggestions/history`, {
      method: 'GET',
      headers: getHeaders(),
    });
    return handleResponse(res);
  },
};

import axios from 'axios';

const rawBackendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';
const backendUrl = rawBackendUrl.endsWith('/') ? rawBackendUrl.slice(0, -1) : rawBackendUrl;

const api = axios.create({
  baseURL: `${backendUrl}/api`,
  withCredentials: true,
});

export default api;

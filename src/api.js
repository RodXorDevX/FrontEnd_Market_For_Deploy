import axios from 'axios';
import { API_BACKEND_URL } from './config';

// Crear instancia de axios con configuración base
const api = axios.create({
  baseURL: API_BACKEND_URL,
  timeout: 10000, // 10 segundos
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: false, // Cambiar a true si usas cookies
});

// Interceptor para manejar errores
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error);

    if (error.code === 'ERR_NETWORK') {
      console.error('Error de red - Verifica CORS o URL del backend');
      console.error('URL usada:', API_BACKEND_URL);
    }

    return Promise.reject(error);
  }
);

export default api;
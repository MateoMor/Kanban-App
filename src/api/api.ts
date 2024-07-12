import axios, { AxiosResponse, AxiosError } from 'axios';

// Se crea la interfaz de la api
const api = axios.create({
    baseURL: 'https://elite-kanban-typescript.onrender.com',
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
    },
});


// Se crea interceptores para manejar los errores
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    if (error.response && error.response.status === 401) {
      // Manejo de error 401 (Unauthorized) aquí si es necesario
    }
    return Promise.reject(error);
  }
);

export default api;
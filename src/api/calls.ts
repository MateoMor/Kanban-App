import api from './api';
import { AxiosResponse } from 'axios';

interface LoginData {
  username: string;
  password: string;
}

interface RegisterData {
  username: string;
  email: string;
  password: string;
}

export async function login(data: LoginData): Promise<void> {

  try {

    const response = await api.post('/api/auth/login', data);
    localStorage.setItem("token", response.data.token);

  } catch (error: any) {

    if (error.response) {
      // El servidor respondió con un estado diferente de 2xx
      console.error(`Error en la respuesta del servidor: ${error.response.data.message}`);
      throw new Error(`Error en la respuesta del servidor: ${error.response.data.message}`);
    } else if (error.request) {
      // La solicitud fue hecha pero no se recibió respuesta
      console.error('No se recibió respuesta del servidor');
      throw new Error('No se recibió respuesta del servidor');
    } else {
      // Algo ocurrió al configurar la solicitud que desencadenó un error
      console.error(`Error al configurar la solicitud: ${error.message}`);
      throw new Error(`Error al configurar la solicitud: ${error.message}`);
    }

  }
}

export async function registerUser(data: RegisterData): Promise<AxiosResponse> {
  try {
    const response = await api.post('/api/auth/register', data);
    console.log('Registro correcto:', response.data);
    return response;
  } catch (error: any) {
    let errorMessage = 'Error al hacer registro';

    if (error.response) {
      errorMessage = `Error en la respuesta del servidor: ${error.response.data.message || error.response.statusText}`;
      console.error(errorMessage);
    } else if (error.request) {
      errorMessage = 'No se recibió respuesta del servidor';
      console.error(errorMessage);
    } else {
      errorMessage = `Error al configurar la solicitud: ${error.message}`;
      console.error(errorMessage);
    }

    throw new Error(errorMessage);
  }
}

export function logout() {
  try {
    localStorage.removeItem("token");
  } catch (error: any) {
    let errorMessage = 'Error al hacer logout';

    if (error.response) {
      errorMessage = `Error en la respuesta del servidor: ${error.response.data.message || error.response.statusText}`;
      console.error(errorMessage);
    } else if (error.request) {
      errorMessage = 'No se recibió respuesta del servidor';
      console.error(errorMessage);
    } else {
      errorMessage = `Error al configurar la solicitud: ${error.message}`;
      console.error(errorMessage);
    }

    throw new Error(errorMessage);
  }
}
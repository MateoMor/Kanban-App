import api  from './api';

interface LoginData {
  username: string;
  passwd: string;
}

interface RegisterData {
    username: string;
    email: string;
    passwd: string;
    }

export async function login(data: LoginData): Promise<void> {
  try {
    await api.post('/api/auth/login', data);
    console.log('Login correcto');
  
  } catch (error: any) {
    throw new Error(`Error al hacer login: ${error.message}`);
  }
}
  
  export async function register(data: RegisterData): Promise<void> {
      try {
          await api.post('/api/auth/register', data);
          
        } catch (error: any) {
            throw new Error(`Error al hacer login: ${error.message}`);
        }
}
        
        
        
        
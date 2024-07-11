import axios, { AxiosResponse, AxiosError, InternalAxiosRequestConfig } from 'axios';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';

const api = axios.create({
    baseURL: 'https://elite-kanban-typescript.onrender.com',
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
    },
});



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

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
  const cookies = context.req.headers.cookie;
  const token = cookies?.split('; ').find(row => row.startsWith('access_token='))?.split('=')[1];

  if (!token) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  return {
    props: {}, // Puedes devolver props adicionales aquí si los necesitas
  };
};

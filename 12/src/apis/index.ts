import axios, { AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios';

export const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000',
  withCredentials: true,
});

export const productAxiosInstance = axios.create({
  baseURL: 'https://dummyjson.com/products',
});

axiosInstance.interceptors.request.use(
  (config: AxiosRequestConfig): InternalAxiosRequestConfig => {
    const token = getCookie('jwt_token');
    if (token && config.url !== '/auth/login') {
      if (!config.headers) {
        config.headers = {};
      }
      // config.headers.Authorization = `Bearer ${token}`;
    }
    return config as InternalAxiosRequestConfig;
  },
  error => Promise.reject(error),
);

const getCookie = (str: string) => str;
// export default axiosInstance;

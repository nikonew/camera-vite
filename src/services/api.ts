import axios, {AxiosInstance} from 'axios';
import { getToken } from './token';


const ApiConfig = {
  BackendUrl: 'https://camera-shop.accelerator.htmlacademy.pro',
  RequestTimeout: 5000
} as const;

export const createAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: ApiConfig.BackendUrl,
    timeout: ApiConfig.RequestTimeout,
  });

  api.interceptors.request.use(
    (config) => {
      const token = getToken();

      if (token && config.headers) {
        config.headers['x-token'] = token;
      }

      return config;
    },
  );

  return api;
};

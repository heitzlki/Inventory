import axios, { AxiosRequestConfig } from 'axios';

export const api = axios.create({
  baseURL: 'http://10.0.2.2:3000/api/',
});

export interface AxiosResponse<T = any> {
  data: T;
  status: number;
  statusText: string;
  headers: Record<string, string>;
  config: AxiosRequestConfig<T>;
  request?: any;
}

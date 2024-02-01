import { Inject, Injectable } from '@nestjs/common';
import { AxiosInstance, AxiosRequestConfig } from 'axios';
import { AXIOS_INSTANCE_TOKEN } from './constants';

@Injectable()
export class AxiosService {
  constructor(@Inject(AXIOS_INSTANCE_TOKEN) private axios: AxiosInstance) {}
  get<T = any>(url: string, config: AxiosRequestConfig) {
    return this.axios.get<T>(url, config);
  }
  post<T = any, D = any>(url: string, data: D, config: AxiosRequestConfig) {
    return this.axios.post<T>(url, data, config);
  }
}

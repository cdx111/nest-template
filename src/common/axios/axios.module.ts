import { Module } from '@nestjs/common';
import { Axios, AxiosRequestConfig } from 'axios';
import { AxiosService } from './axios.service';
import { AXIOS_INSTANCE_TOKEN } from './constants';

@Module({
  providers: [
    {
      provide: AXIOS_INSTANCE_TOKEN,
      useValue: new Axios(),
    },
    AxiosService,
  ],
  exports: [AxiosService],
})
export class AxiosModule {
  static register(options: AxiosRequestConfig) {
    return {
      module: AxiosModule,
      providers: [
        {
          provide: AXIOS_INSTANCE_TOKEN,
          useValue: new Axios(options),
        },
        AxiosService,
      ],
      exports: [AxiosService],
    };
  }
}

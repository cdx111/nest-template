import { Module } from '@nestjs/common';
import axios, { AxiosRequestConfig } from 'axios';
import { AxiosService } from './axios.service';
import { AXIOS_INSTANCE_TOKEN } from './constants';

@Module({
  providers: [
    {
      provide: AXIOS_INSTANCE_TOKEN,
      useValue: axios.create(),
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
          useValue: axios.create(options),
        },
        AxiosService,
      ],
      exports: [AxiosService],
    };
  }
}

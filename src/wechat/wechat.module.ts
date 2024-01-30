import { Module } from '@nestjs/common';
import { WechatMiniprogramService } from './wechat-miniprogram.service';
import { AxiosModule } from '@common/axios';
import { WECHAT_CONFIG_TOKEN } from './constants';
import { WechatConfig } from './types';
import { WechatAccessTokenService } from './wechat-access-token.service';

@Module({
  imports: [AxiosModule.register({ timeout: 5000 })],
  providers: [WechatAccessTokenService, WechatMiniprogramService],
})
export class WechatModule {
  static register(options: WechatConfig) {
    return {
      module: WechatModule,
      providers: [
        {
          provide: WECHAT_CONFIG_TOKEN,
          useValue: options,
        },
      ],
    };
  }
}

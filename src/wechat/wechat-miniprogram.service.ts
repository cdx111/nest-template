import { AxiosService } from '../common/axios/axios.service';
import { Inject, Injectable } from '@nestjs/common';
import { WECHAT_CONFIG_TOKEN } from './constants';
import { LoginResult, WechatConfig } from './types';

@Injectable()
export class WechatMiniprogramService {
  constructor(
    private axios: AxiosService,
    @Inject(WECHAT_CONFIG_TOKEN) private wechatConfig: WechatConfig,
  ) {}
  async login(js_code: string): Promise<LoginResult | null> {
    const res = await this.axios.get<string>(
      'https://api.weixin.qq.com/sns/jscode2session',
      {
        params: {
          appid: this.wechatConfig.appid,
          secret: this.wechatConfig.appSecret,
          js_code,
          grant_type: 'authorization_code',
        },
      },
    );
    const data = JSON.parse(res.data);
    if (!data.openid) {
      console.log(data);
      return null;
    }
    return data;
  }
}

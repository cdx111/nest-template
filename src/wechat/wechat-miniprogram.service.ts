import { AxiosService } from '../common/axios/axios.service';
import { Inject, Injectable } from '@nestjs/common';
import { ACCESS_TOKEN_KEY, WECHAT_CONFIG_TOKEN } from './constants';
import { LoginResult, WechatConfig, msgSecCheckResult } from './types';
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';

@Injectable()
export class WechatMiniprogramService {
  constructor(
    private axios: AxiosService,
    @Inject(WECHAT_CONFIG_TOKEN) private wechatConfig: WechatConfig,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}
  async login(js_code: string): Promise<LoginResult | null> {
    const res = await this.axios.get<LoginResult>(
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
    const { data } = res;
    if (!data.openid) {
      return null;
    }
    return data;
  }
  /**
   * @description 文本内容安全识别
   */
  async msgSecCheck(
    content: string,
    openid: string,
  ): Promise<msgSecCheckResult> {
    const res = await this.axios.post<msgSecCheckResult>(
      'https://api.weixin.qq.com/wxa/msg_sec_check',
      {
        version: 0,
        content,
        scene: 1,
        openid,
      },
      {
        params: {
          access_token: await this.cacheManager.get(ACCESS_TOKEN_KEY),
        },
      },
    );
    return res.data;
  }
}

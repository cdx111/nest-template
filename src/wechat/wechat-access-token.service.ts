import { Inject, Injectable } from '@nestjs/common';
import { AccessToken, WechatConfig } from './types';
import { AxiosService } from '@common/axios';
import { WECHAT_CONFIG_TOKEN } from './constants';
import { SchedulerRegistry, Timeout } from '@nestjs/schedule';
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';

@Injectable()
export class WechatAccessTokenService {
  constructor(
    private axios: AxiosService,
    @Inject(WECHAT_CONFIG_TOKEN) private wechatConfig: WechatConfig,
    private readonly schedulerRegistry: SchedulerRegistry,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}
  async getAccessToken(): Promise<AccessToken> {
    const res = await this.axios.get(
      'https://api.weixin.qq.com/cgi-bin/token',
      {
        params: {
          grant_type: 'client_credential',
          appid: this.wechatConfig.appid,
          secret: this.wechatConfig.appScrect,
        },
      },
    );
    const data = JSON.parse(res.data);
    if (!data.access_token) {
      console.log(data);
      return null;
    }
    return data;
  }
  @Timeout(0)
  start() {
    this.refreshToken();
  }
  async refreshToken() {
    const data = await this.getAccessToken();
    if (data) {
      this.cacheManager.set('access_token', data.access_token);
      const id = setTimeout(
        this.refreshToken.bind(this),
        (data.expires_in - 119 * 60) * 1000,
      );
      try {
        this.schedulerRegistry.deleteTimeout('refreshToken');
      } catch (e) {}
      this.schedulerRegistry.addTimeout('refreshToken', id);
    }
  }
}

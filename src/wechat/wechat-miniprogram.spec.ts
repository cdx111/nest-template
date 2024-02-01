import { Test, TestingModule } from '@nestjs/testing';
import { WechatMiniprogramService } from './wechat-miniprogram.service';
import { WechatModule } from './wechat.module';
import { ScheduleModule } from '@nestjs/schedule';
import { CACHE_MANAGER, Cache, CacheModule } from '@nestjs/cache-manager';
import { ACCESS_TOKEN_KEY } from './constants';
import { WechatAccessTokenService } from './wechat-access-token.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AccessToken } from './types';

describe('WechatMiniprogramService', () => {
  let service: WechatMiniprogramService;
  let cache: Cache;
  let accessToken: AccessToken;
  let openid: string;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ScheduleModule.forRoot(),
        ConfigModule.forRoot({ isGlobal: true }),
        CacheModule.register({ isGlobal: true }),
        WechatModule.registerAsync({
          async useFactory(configService: ConfigService) {
            return {
              appid: configService.get('WECHAT_APP_ID'),
              appSecret: configService.get('WECHAT_APP_SECRET'),
            };
          },
          inject: [ConfigService],
        }),
      ],
    }).compile();
    cache = module.get(CACHE_MANAGER);
    service = module.get(WechatMiniprogramService);
    accessToken = await module.get(WechatAccessTokenService).getAccessToken();
    cache.set(ACCESS_TOKEN_KEY, accessToken.access_token);
  });

  it('access token should be string', async () => {
    expect(typeof accessToken.access_token).toBe('string');
  });

  it('login reuslt should include an errcode of field ', async () => {
    const res = await service.login('0c3Cd62w3opwb23J9K1w3uMUpK2Cd62f');
    if (res) {
      const truth = typeof res.openid === 'string';
      expect(truth).toBe(true);
      if (truth) {
        openid = res.openid;
      }
    } else {
      expect(res).toBe(null);
    }
  });
  it('msgSecCheck errcode should be 0 ', async () => {
    if (typeof openid === 'string') {
      const { errcode } = await service.msgSecCheck('hello world', openid);
      expect(errcode).toBe(0);
    }
  });
});

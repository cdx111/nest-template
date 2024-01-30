import { Test, TestingModule } from '@nestjs/testing';
import { WechatMiniprogramService } from './wechat-miniprogram.service';
import { WechatModule } from './wechat.module';
import { ScheduleModule } from '@nestjs/schedule';
import { CACHE_MANAGER, Cache, CacheModule } from '@nestjs/cache-manager';
import { ACCESS_TOKEN_KEY } from './constants';
import { WechatAccessTokenService } from './wechat-access-token.service';

describe('WechatMiniprogramService', () => {
  let service: WechatMiniprogramService;
  let cache: Cache;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ScheduleModule.forRoot(),
        CacheModule.register({ isGlobal: true }),
        WechatModule.register({
          appid: '',
          appScrect: '',
        }),
      ],
    }).compile();
    cache = module.get(CACHE_MANAGER);
    service = module.get(WechatMiniprogramService);
    const accessToken = await module
      .get(WechatAccessTokenService)
      .getAccessToken();
    cache.set(ACCESS_TOKEN_KEY, accessToken.access_token);
  });

  it('login reuslt should include an errcode of field ', async () => {
    const res = await service.login('0b3WskGa1w6jQG0rRmGa1aQJfi0WskGC');
    if (res) {
      expect(typeof res.openid).toBe('string');
    } else {
      expect(res).toBe(null);
    }
  });
});

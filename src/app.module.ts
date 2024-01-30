import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { CacheModule } from '@nestjs/cache-manager';
import { ScheduleModule } from '@nestjs/schedule';
import { WechatModule } from './wechat/wechat.module';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';
@Module({
  imports: [
    WinstonModule.forRoot({
      format: winston.format.combine(
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        winston.format.simple(),
      ),
      transports: [new winston.transports.File({ filename: 'combined.log' })],
    }),
    ScheduleModule.forRoot(),
    CacheModule.register({ isGlobal: true }),
    AuthModule,
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    WechatModule.registerAsync({
      async useFactory(configService: ConfigService) {
        return {
          appid: configService.get('WECHAT_APPID'),
          appSecret: configService.get('WECHAT_APPSECRET'),
        };
      },
      inject: [ConfigService],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

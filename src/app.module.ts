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
import { UserModule } from './user';
import { ThrottlerModule } from '@nestjs/throttler';

const isDevelopment = process.env.NODE_ENV === 'development';

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
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 1,
      },
    ]),
    CacheModule.register({ isGlobal: true }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: isDevelopment ? '.env.development' : '.env',
    }),
    PrismaModule,
    WechatModule.registerAsync({
      async useFactory(configService: ConfigService) {
        return {
          appid: configService.get('WECHAT_APP_ID'),
          appSecret: configService.get('WECHAT_APP_SECRET'),
        };
      },
      inject: [ConfigService],
    }),
    AuthModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

import { Controller, Get, Inject } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { sleep } from 'utility';
import { Logger } from 'winston';

@Controller()
export class AppController {
  constructor(@Inject(WINSTON_MODULE_PROVIDER) private logger: Logger) {}

  @Get('/verify')
  verify() {
    this.logger.info('verify', { controller: AppController.name });
  }
  @Get('/a')
  async getA() {
    await sleep(2000);
    return 'a';
  }
}

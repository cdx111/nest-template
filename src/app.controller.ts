import { Controller, Get, Inject } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

@Controller()
export class AppController {
  constructor(@Inject(WINSTON_MODULE_PROVIDER) private logger: Logger) {}

  @Get('/verify')
  verify() {
    this.logger.info('log222ger', { controller: AppController.name });
  }
}

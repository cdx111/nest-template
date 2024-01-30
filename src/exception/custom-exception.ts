import { HttpException } from '@nestjs/common';

export class CustomException extends HttpException {
  constructor() {
    super({ statusCode: 1001, message: '自定义异常' }, 200);
  }
}

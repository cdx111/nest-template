import {
  Injectable,
  ArgumentMetadata,
  BadRequestException,
  ValidationPipe as Validation,
} from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class ValidationPipe extends Validation {
  async transform(value: any, metadata: ArgumentMetadata) {
    const metatype = metadata.metatype;
    if (!metatype || !this.toValidate(metadata)) {
      return value;
    }
    const object = plainToInstance(metadata.metatype, value);
    const errors = await validate(object);
    if (errors.length > 0) {
      throw new BadRequestException(this.flattenValidationErrors(errors)[0]);
    }
    return value;
  }
}

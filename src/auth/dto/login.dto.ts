import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    required: true,
    description: '用户名',
  })
  @IsString({ message: '用户名必须是字符串' })
  @Length(6, 20, { message: '用户名必须大于6位小于20位' })
  username: string;

  @ApiProperty({
    required: true,
    description: '用户密码',
  })
  @IsString({ message: '密码错误' })
  @Length(8, 20, { message: '密码错误' })
  passward: string;
}

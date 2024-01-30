import { ApiProperty } from '@nestjs/swagger';
import { IsPassword } from 'src/common/validation/decorator/is-password';
import { IsUsername } from 'src/common/validation/decorator/is-username';
export class SignUpDto {
  @IsUsername()
  @ApiProperty({
    required: true,
    description: '用户名',
  })
  username: string;

  @IsPassword()
  @ApiProperty({
    required: true,
    description: '密码',
  })
  passward: string;
}

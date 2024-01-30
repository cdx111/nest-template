import { Body, Controller, Post } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/sign-up.dto';
import { ValidationPipe } from 'src/common/validation/validation.pipe';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  @ApiOperation({ summary: '登录' })
  @ApiResponse({
    status: 200,
    description: '登录成功',
    schema: { type: 'string', description: 'token' },
  })
  login(@Body(new ValidationPipe()) loginDto: LoginDto): Promise<string> {
    return this.authService.login(loginDto);
  }
  @Post('/sign-up')
  @ApiOperation({ summary: '注册' })
  @ApiResponse({
    status: 200,
    description: '注册成功',
    schema: { type: 'string', description: 'token' },
  })
  signUp(@Body(new ValidationPipe()) signUpDto: SignUpDto) {
    return this.authService.signUp(signUpDto);
  }
}

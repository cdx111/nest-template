import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { PasswordService } from './password.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private prismaService: PrismaService,
    private passwordService: PasswordService,
  ) {}
  signToken(userId: string) {
    return this.jwtService.sign({ sub: userId });
  }
  async login(payload: LoginDto): Promise<string> {
    const user = await this.prismaService.user.findUnique({
      where: {
        username: payload.username,
      },
    });

    if (!user) {
      throw new BadRequestException('密码错误');
    }

    if (
      !(await this.passwordService.comparePassword(
        payload.password,
        user.password,
      ))
    ) {
      throw new BadRequestException('密码错误');
    }

    return this.signToken(user.id);
  }
  async signUp(payload: SignUpDto) {
    const hash = await this.passwordService.hashPassword(payload.password);
    try {
      const user = await this.prismaService.user.create({
        data: {
          username: payload.username,
          password: hash,
          role: 'USER',
        },
      });
      return this.signToken(user.id);
    } catch (e) {
      if (
        e instanceof Prisma.PrismaClientKnownRequestError &&
        e.code === 'P2002'
      ) {
        throw new ConflictException('用户名已存在');
      }
      throw new Error(e);
    }
  }
}

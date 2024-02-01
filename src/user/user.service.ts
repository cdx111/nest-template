import { Injectable } from '@nestjs/common';
import { omit } from 'lodash';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}
  async getUserInfo(id: string) {
    const user = await this.prismaService.user.findUnique({ where: { id } });
    return omit(user, 'password');
  }
}

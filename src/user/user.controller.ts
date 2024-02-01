import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';

import { UserService } from './user.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { ThrottlerGuard } from '@nestjs/throttler';

@Controller('/user')
export class UserController {
  constructor(private userService: UserService) {}
  @Get('/info')
  @UseGuards(ThrottlerGuard, AuthGuard)
  getInfo(@Req() request: Request) {
    return this.userService.getUserInfo(request.user.userId);
  }
}

import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { JwtPayload } from 'jsonwebtoken';
import { JwtAuthGuard } from '../../../auth/guards/jwt-auth.guard';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('me')
  @UseGuards(JwtAuthGuard)
  async getMe(@Req() req): Promise<JwtPayload> {
    return req.user;
  }
}

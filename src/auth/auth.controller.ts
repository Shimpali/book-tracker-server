import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { UserDocument } from '../api/v1/users/data/user.document';
import { CreateUserDto } from '../api/v1/users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { LoginStatus } from './interfaces/login-status.interface';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  public async register(
    @Body() createUserDto: CreateUserDto,
  ): Promise<UserDocument> {
    const result: UserDocument = await this.authService.register(createUserDto);

    if (!result)
      throw new HttpException('Something went wrong!', HttpStatus.BAD_REQUEST);

    return result;
  }

  @Post('login')
  public async login(@Body() loginDto: LoginDto): Promise<LoginStatus> {
    return await this.authService.login(loginDto);
  }
}

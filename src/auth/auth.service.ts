import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Types } from 'mongoose';
import { UserDocument } from '../api/v1/users/data/user.document';
import { CreateUserDto } from '../api/v1/users/dto/create-user.dto';
import { UsersService } from '../api/v1/users/users.service';
import { LoginDto } from './dto/login.dto';
import { LoginStatus } from './interfaces/login-status.interface';
import { JwtPayload } from './interfaces/payload.interface';
import { Token } from './interfaces/token';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register(userDto: CreateUserDto): Promise<LoginStatus> {
    // create user in db
    const user = await this.usersService.create(userDto);

    // generate and sign token
    const token = this.createToken(user.id, user.username);

    const { id, username, email } = user;

    return {
      id,
      username,
      email,
      ...token,
    };
  }

  async login(loginUserDto: LoginDto): Promise<LoginStatus> {
    // find user in db
    const user = await this.usersService.findByLogin(loginUserDto);

    if (!user)
      throw new HttpException('User does not exist!', HttpStatus.UNAUTHORIZED);

    // generate and sign token
    const token = this.createToken(user.id, user.username);

    const { id, username, email } = user;

    return {
      id,
      username,
      email,
      ...token,
    };
  }

  async validateUser(payload: JwtPayload): Promise<UserDocument> {
    const user = await this.usersService.findOne(payload.id);
    if (!user)
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);

    return user;
  }

  private createToken(id: Types.ObjectId, username: string): Token {
    const expiresIn = '7d';
    const user: JwtPayload = { id, username };
    const accessToken = this.jwtService.sign(user);

    return {
      expiresIn,
      accessToken,
    };
  }
}

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { comparePasswords } from 'src/common/utils';
import { LoginDto } from '../../../auth/dto/login.dto';
import { UserDocument } from './data/user.document';
import { UserRepository } from './data/user.repository';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(private userRepository: UserRepository) {}

  async findOne(id: string): Promise<UserDocument> {
    const user = await this.userRepository.getUserById(id);
    return user;
  }

  async findByLogin({ username, password }: LoginDto): Promise<UserDocument> {
    const user: UserDocument = await this.userRepository.getUserByUsername(
      username,
    );
    console.log(user);
    if (!user)
      throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);

    // compare passwords
    const areEqual = await comparePasswords(user.password, password);

    if (!areEqual)
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);

    return user;
  }

  async findByPayload({
    username,
  }: {
    username: string;
  }): Promise<UserDocument> {
    return await this.userRepository.getUserByUsername(username);
  }

  async create(userDto: CreateUserDto): Promise<UserDocument> {
    const { username, password, passwordConfirm, email } = userDto;

    // check if the user exists in the db
    const userInDb: UserDocument = await this.userRepository.getUserByUsername(
      username,
    );
    if (userInDb)
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);

    const user: UserDocument = await this.userRepository.createUser({
      username,
      password,
      passwordConfirm,
      email,
    });

    return user;
  }
}

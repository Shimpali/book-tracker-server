import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UserDocument } from './user.document';
import { UserCollectionName } from './user.schema';

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(UserCollectionName) private userModel: Model<UserDocument>
  ) {}

  async createUser(addUserDto: CreateUserDto): Promise<UserDocument> {
    const newUser = new this.userModel(addUserDto);
    return newUser.save();
  }

  async getAllUsers(): Promise<UserDocument[]> {
    return this.userModel.find().exec();
  }

  async getUserByUsername(username: string): Promise<UserDocument> {
    // + will select a field that is not selected by default from UserSchema
    return this.userModel.findOne({ username }).select('+password').exec();
  }

  async getUserById(id: string): Promise<UserDocument> {
    return this.userModel.findById(id).exec();
  }

  async updateUser(
    id: string,
    updatedUser: UpdateUserDto
  ): Promise<UserDocument> {
    return this.userModel.findByIdAndUpdate(id, updatedUser, {
      new: true,
    });
  }

  async deleteUser(id: string) {
    return this.userModel.findByIdAndRemove(id);
  }
}

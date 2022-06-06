import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { AddProgressDto } from '../dto/add-progress.dto';
import { UpdateProgressDto } from '../dto/update-progress.dto';
import { ProgressDocument } from './progress.document';
import { ProgressCollectionName } from './progress.schema';

@Injectable()
export class ProgressRepository {
  constructor(
    @InjectModel(ProgressCollectionName)
    private progressModel: Model<ProgressDocument>,
  ) {}

  async addProgress(addProgressDto: AddProgressDto): Promise<ProgressDocument> {
    const newProgress = new this.progressModel(addProgressDto);
    return newProgress.save();
  }

  async getAllProgress(user: Types.ObjectId): Promise<ProgressDocument[]> {
    return this.progressModel.find({ user }).exec();
  }

  async getProgressByUserAndBookIds(
    book: Types.ObjectId,
    user: Types.ObjectId,
  ): Promise<ProgressDocument> {
    return this.progressModel.findOne({ user, book }).exec();
  }

  async getProgressById(id: string): Promise<ProgressDocument> {
    return this.progressModel.findById(id).exec();
  }

  async updateProgress(
    id: string,
    updatedProgress: UpdateProgressDto,
  ): Promise<ProgressDocument> {
    return this.progressModel.findByIdAndUpdate(id, updatedProgress, {
      new: true,
    });
  }

  async deleteProgress(id: string) {
    return this.progressModel.findByIdAndRemove(id);
  }
}

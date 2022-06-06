import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AddProgressDto } from '../dto/add-progress.dto';
import { UpdateProgressDto } from '../dto/update-progress.dto';
import { ProgressDocument } from './progress.document';
import { ProgressCollectionName } from './progress.schema';

@Injectable()
export class ProgressRepository {
  constructor(
    @InjectModel(ProgressCollectionName)
    private reviewModel: Model<ProgressDocument>,
  ) {}

  async addProgress(addProgressDto: AddProgressDto): Promise<ProgressDocument> {
    const newProgress = new this.reviewModel(addProgressDto);
    return newProgress.save();
  }

  async getAllProgresss(): Promise<ProgressDocument[]> {
    return this.reviewModel.find().exec();
  }

  async getProgressById(id: string): Promise<ProgressDocument> {
    return this.reviewModel.findById(id).exec();
  }

  async updateProgress(
    id: string,
    updatedProgress: UpdateProgressDto,
  ): Promise<ProgressDocument> {
    return this.reviewModel.findByIdAndUpdate(id, updatedProgress, {
      new: true,
    });
  }

  async deleteProgress(id: string) {
    return this.reviewModel.findByIdAndRemove(id);
  }
}

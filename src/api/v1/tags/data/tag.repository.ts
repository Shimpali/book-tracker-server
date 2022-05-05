import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AddTagDto } from '../dto/add-tag.dto';
import { UpdateTagDto } from '../dto/update-tag.dto';
import { TagDocument } from './tag.document';
import { TagCollectionName } from './tag.schema';

@Injectable()
export class TagRepository {
  constructor(
    @InjectModel(TagCollectionName) private tagModel: Model<TagDocument>
  ) {}

  async addTag(addTagDto: AddTagDto): Promise<TagDocument> {
    const newTag = new this.tagModel(addTagDto);
    return newTag.save();
  }

  async getAllTags(): Promise<TagDocument[]> {
    return this.tagModel.find().exec();
  }

  async getTagById(id: string): Promise<TagDocument> {
    return this.tagModel.findById(id).exec();
  }

  async updateTag(id: string, updatedTag: UpdateTagDto): Promise<TagDocument> {
    return this.tagModel.findByIdAndUpdate(id, updatedTag, {
      new: true,
    });
  }

  async deleteTag(id: string) {
    return this.tagModel.findByIdAndRemove(id);
  }
}

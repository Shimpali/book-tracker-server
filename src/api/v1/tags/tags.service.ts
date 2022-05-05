import { Injectable } from '@nestjs/common';
import { TagDocument } from './data/tag.document';
import { TagRepository } from './data/tag.repository';
import { AddTagDto } from './dto/add-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';

@Injectable()
export class TagsService {
  constructor(private tagRepository: TagRepository) {}

  async add(addTagDto: AddTagDto): Promise<TagDocument> {
    return this.tagRepository.addTag(addTagDto);
  }

  async findAll(): Promise<TagDocument[]> {
    return this.tagRepository.getAllTags();
  }

  async findOne(id: string): Promise<TagDocument> {
    return this.tagRepository.getTagById(id);
  }

  async update(id: string, updatedTag: UpdateTagDto): Promise<TagDocument> {
    return this.tagRepository.updateTag(id, updatedTag);
  }

  async remove(id: string) {
    return this.tagRepository.deleteTag(id);
  }
}

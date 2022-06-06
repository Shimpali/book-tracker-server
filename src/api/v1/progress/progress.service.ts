import { Injectable } from '@nestjs/common';
import { ProgressDocument } from './data/progress.document';
import { ProgressRepository } from './data/progress.repository';
import { AddProgressDto } from './dto/add-progress.dto';
import { UpdateProgressDto } from './dto/update-progress.dto';

@Injectable()
export class ProgressService {
  constructor(private progressRepository: ProgressRepository) {}

  async add(addProgressDto: AddProgressDto): Promise<ProgressDocument> {
    return this.progressRepository.addProgress(addProgressDto);
  }

  async findAll(): Promise<ProgressDocument[]> {
    return this.progressRepository.getAllProgresss();
  }

  async findOne(id: string): Promise<ProgressDocument> {
    return this.progressRepository.getProgressById(id);
  }

  async update(
    id: string,
    updatedProgress: UpdateProgressDto,
  ): Promise<ProgressDocument> {
    return this.progressRepository.updateProgress(id, updatedProgress);
  }

  async remove(id: string) {
    return this.progressRepository.deleteProgress(id);
  }
}

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ApplicationModules } from 'src/common/enums';
import { JwtAuthGuard } from '../../../auth/guards/jwt-auth.guard';
import { ProgressDocument } from './data/progress.document';
import { AddProgressDto } from './dto/add-progress.dto';
import { UpdateProgressDto } from './dto/update-progress.dto';
import { ProgressService } from './progress.service';

@ApiTags(ApplicationModules.REVIEWS)
@UseGuards(JwtAuthGuard)
@Controller('progress')
export class ProgressController {
  constructor(private readonly progressService: ProgressService) {}

  @Post()
  async add(@Body() addProgressDto: AddProgressDto): Promise<ProgressDocument> {
    return this.progressService.add(addProgressDto);
  }

  @Get()
  @ApiBearerAuth()
  async findAll(): Promise<ProgressDocument[]> {
    return this.progressService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ProgressDocument> {
    return this.progressService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateProgressDto: UpdateProgressDto,
  ): Promise<ProgressDocument> {
    return this.progressService.update(id, updateProgressDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.progressService.remove(id);
  }
}

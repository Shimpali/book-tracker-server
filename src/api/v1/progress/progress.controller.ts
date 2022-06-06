import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Types } from 'mongoose';
import { ApplicationModules } from 'src/common/enums';
import { JwtAuthGuard } from '../../../auth/guards/jwt-auth.guard';
import { ProgressDocument } from './data/progress.document';

import { AddProgressDto } from './dto/add-progress.dto';
import { UpdateProgressDto } from './dto/update-progress.dto';
import { ProgressService } from './progress.service';

@ApiTags(ApplicationModules.PROGRESS)
@UseGuards(JwtAuthGuard)
@Controller('progress')
export class ProgressController {
  constructor(private readonly progressService: ProgressService) {}

  @Post()
  async add(
    @Body() addProgressDto: AddProgressDto,
    @Req() request,
  ): Promise<ProgressDocument> {
    const user = request.user?.id;
    return this.progressService.add({ ...addProgressDto, user });
  }

  @Get()
  @ApiBearerAuth()
  async findAll(@Req() request): Promise<ProgressDocument[]> {
    const user = request.user?.id as Types.ObjectId;
    return this.progressService.findAll(user);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ProgressDocument> {
    return this.progressService.findById(id);
  }

  @Get('book/:bookId')
  async findByUserAndBook(
    @Param('bookId') bookId: Types.ObjectId,
    @Req() request,
  ): Promise<ProgressDocument> {
    const user = request.user?.id;
    const progress: ProgressDocument = await this.progressService.findOne(
      bookId,
      user,
    );

    if (!progress)
      throw new HttpException('Progress not found!', HttpStatus.BAD_REQUEST);

    return progress;
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

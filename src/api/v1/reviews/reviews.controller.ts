import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ApplicationModules } from 'src/common/enums';
import { JwtAuthGuard } from '../../../auth/guards/jwt-auth.guard';
import { ReviewDocument } from './data/review.document';
import { AddReviewDto } from './dto/add-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { ReviewsService } from './reviews.service';

@ApiTags(ApplicationModules.REVIEWS)
@UseGuards(JwtAuthGuard)
@Controller('reviews')
export class ReviewsController {
  constructor(private readonly booksService: ReviewsService) {}

  @Post()
  async add(@Body() addReviewDto: AddReviewDto): Promise<ReviewDocument> {
    return this.booksService.add(addReviewDto);
  }

  @Get()
  @ApiBearerAuth()
  async findAll(): Promise<ReviewDocument[]> {
    return this.booksService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ReviewDocument> {
    return this.booksService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateReviewDto: UpdateReviewDto,
  ): Promise<ReviewDocument> {
    return this.booksService.update(id, updateReviewDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.booksService.remove(id);
  }
}

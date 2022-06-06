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
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { QueryParamsDTO } from 'src/common/dto';
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
  constructor(private readonly reviewsService: ReviewsService) {}

  @Post()
  async add(
    @Body() addReviewDto: AddReviewDto,
    @Req() request,
  ): Promise<ReviewDocument> {
    const user = request.user?.id;
    return this.reviewsService.add({ ...addReviewDto, user });
  }

  @Get()
  @ApiBearerAuth()
  async findAll(
    @Query() queryParams: QueryParamsDTO,
    @Req() request,
  ): Promise<ReviewDocument[]> {
    const user = request.user?.id;
    return this.reviewsService.findAll({ ...queryParams, user });
  }

  @Get(':bookId')
  async findByUserAndBook(
    @Query() queryParams: QueryParamsDTO,
    @Req() request,
  ): Promise<ReviewDocument> {
    const user = request.user?.id;
    const review: ReviewDocument = await this.reviewsService.findOne({
      ...queryParams,
      user,
    });

    if (!review)
      throw new HttpException('Review not found!', HttpStatus.BAD_REQUEST);

    return review;
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ReviewDocument> {
    return this.reviewsService.findById(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateReviewDto: UpdateReviewDto,
  ): Promise<ReviewDocument> {
    return this.reviewsService.update(id, updateReviewDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.reviewsService.remove(id);
  }
}

import { Injectable, Query } from '@nestjs/common';
import { QueryParamsDTO } from 'src/common/dto';
import { ReviewDocument } from './data/review.document';
import { ReviewRepository } from './data/review.repository';
import { AddReviewDto } from './dto/add-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';

@Injectable()
export class ReviewsService {
  constructor(private reviewRepository: ReviewRepository) {}

  async add(addReviewDto: AddReviewDto): Promise<ReviewDocument> {
    return this.reviewRepository.addReview(addReviewDto);
  }

  async findAll(
    @Query() queryParams?: QueryParamsDTO,
  ): Promise<ReviewDocument[]> {
    return this.reviewRepository.getAllReviews(queryParams);
  }

  async findOne(
    @Query() queryParams?: QueryParamsDTO,
  ): Promise<ReviewDocument> {
    return this.reviewRepository.getReviewByUserAndBookIds(queryParams);
  }

  async findById(id: string): Promise<ReviewDocument> {
    return this.reviewRepository.getReviewById(id);
  }

  async update(
    id: string,
    updatedReview: UpdateReviewDto,
  ): Promise<ReviewDocument> {
    return this.reviewRepository.updateReview(id, updatedReview);
  }

  async remove(id: string) {
    return this.reviewRepository.deleteReview(id);
  }
}

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { QueryParamsDTO } from 'src/common/dto';
import { AddReviewDto } from '../dto/add-review.dto';
import { UpdateReviewDto } from '../dto/update-review.dto';
import { ReviewDocument } from './review.document';
import { ReviewCollectionName } from './review.schema';

@Injectable()
export class ReviewRepository {
  constructor(
    @InjectModel(ReviewCollectionName)
    private reviewModel: Model<ReviewDocument>,
  ) {}

  async addReview(addReviewDto: AddReviewDto): Promise<ReviewDocument> {
    const newReview = new this.reviewModel(addReviewDto);
    return newReview.save();
  }

  async getAllReviews(queryParams?: QueryParamsDTO): Promise<ReviewDocument[]> {
    const { book, user, search, offset, limit } = queryParams;
    const userQuery = user ? { user } : {};
    const bookQuery = book ? { book } : {};
    const searchQuery = search
      ? { title: { $regex: new RegExp(`${search || ''}`, 'i') } }
      : {};
    const query = { ...userQuery, ...bookQuery, ...searchQuery };

    return this.reviewModel
      .find(query)
      .skip(offset || 0)
      .limit(limit || 10)
      .exec();
  }

  async getReviewByUserAndBookIds(
    queryParams?: QueryParamsDTO,
  ): Promise<ReviewDocument> {
    const { user, book } = queryParams;
    return this.reviewModel.findById({ user, book }).exec();
  }

  async getReviewById(id: string): Promise<ReviewDocument> {
    return this.reviewModel.findById(id).exec();
  }

  async updateReview(
    id: string,
    updatedReview: UpdateReviewDto,
  ): Promise<ReviewDocument> {
    return this.reviewModel.findByIdAndUpdate(id, updatedReview, {
      new: true,
    });
  }

  async deleteReview(id: string) {
    return this.reviewModel.findByIdAndRemove(id);
  }
}

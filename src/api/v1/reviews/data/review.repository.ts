import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AddReviewDto } from '../dto/add-review.dto';
import { UpdateReviewDto } from '../dto/update-review.dto';
import { ReviewDocument } from './review.document';
import { ReviewCollectionName } from './review.schema';

@Injectable()
export class ReviewRepository {
  constructor(
    @InjectModel(ReviewCollectionName)
    private reviewModel: Model<ReviewDocument>
  ) {}

  async addReview(addReviewDto: AddReviewDto): Promise<ReviewDocument> {
    const newReview = new this.reviewModel(addReviewDto);
    return newReview.save();
  }

  async getAllReviews(): Promise<ReviewDocument[]> {
    return this.reviewModel.find().exec();
  }

  async getReviewById(id: string): Promise<ReviewDocument> {
    return this.reviewModel.findById(id).exec();
  }

  async updateReview(
    id: string,
    updatedReview: UpdateReviewDto
  ): Promise<ReviewDocument> {
    return this.reviewModel.findByIdAndUpdate(id, updatedReview, {
      new: true,
    });
  }

  async deleteReview(id: string) {
    return this.reviewModel.findByIdAndRemove(id);
  }
}

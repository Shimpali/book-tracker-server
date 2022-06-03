import { Schema } from 'mongoose';
import { ApplicationModules } from 'src/common/enums';
import { ReviewCollectionName } from '../../reviews/data/review.schema';

export const BookCollectionName = ApplicationModules.BOOKS;

export const BookSchema = new Schema(
  {
    title: String,
    author: String,
    cover: String,
    pageCount: Number,
    link: String,
    categories: String,
    volumeId: String,
  },
  {
    collection: BookCollectionName,
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

BookSchema.virtual('reviews', {
  ref: ReviewCollectionName,
  foreignField: 'book',
  localField: '_id',
  justOne: false,
});

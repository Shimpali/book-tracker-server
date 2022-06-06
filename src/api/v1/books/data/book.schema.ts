import { Schema } from 'mongoose';

import { ApplicationModules, Status } from 'src/common/enums';
import { ProgressCollectionName } from '../../progress/data/progress.schema';
import { ReviewCollectionName } from '../../reviews/data/review.schema';

export const BookCollectionName = ApplicationModules.BOOKS;

export const BookSchema = new Schema(
  {
    title: String,
    subtitle: String,
    authors: [String],
    description: String,
    cover: String,
    pageCount: Number,
    link: String,
    publishedfDate: String,
    categories: [String],
    averageRating: Number,
    volumeId: String,
    status: { type: String, enum: Status, default: 'WANT_TO_READ' },
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

BookSchema.virtual('progress', {
  ref: ProgressCollectionName,
  foreignField: 'book',
  localField: '_id',
  justOne: true,
});

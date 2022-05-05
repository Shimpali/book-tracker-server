import { Schema } from 'mongoose';
import { ApplicationModules, Models } from 'src/common/enums';

export const ReviewCollectionName = ApplicationModules.REVIEWS;

export const ReviewSchema = new Schema(
  {
    book: { type: Schema.Types.ObjectId, ref: Models.BOOK },
    title: String,
    content: String,
    user: { type: Schema.Types.ObjectId, ref: Models.USER },
  },
  {
    collection: ReviewCollectionName,
    timestamps: true,
  },
);

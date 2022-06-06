import { Schema } from 'mongoose';
import { ApplicationModules, Models } from 'src/common/enums';
import { PositionType } from 'src/common/models';
import { BookCollectionName } from '../../books/data/book.schema';

export const ProgressCollectionName = ApplicationModules.REVIEWS;

export const ProgressSchema = new Schema(
  {
    currentPosition: Number,
    finalPosition: Number,
    type: {
      type: String,
      enum: PositionType,
      default: PositionType.Pages,
    },
    user: { type: Schema.Types.ObjectId, ref: Models.USER },
  },
  {
    collection: ProgressCollectionName,
    timestamps: true,
  },
);

ProgressSchema.virtual('book', {
  ref: BookCollectionName,
  foreignField: 'book',
  localField: 'book',
  justOne: false,
});

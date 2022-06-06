import { Schema } from 'mongoose';
import { ApplicationModules, Models, PositionType } from 'src/common/enums';

export const ProgressCollectionName = ApplicationModules.PROGRESS;

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
    book: { type: Schema.Types.ObjectId, ref: Models.BOOK },
  },
  {
    collection: ProgressCollectionName,
    timestamps: true,
  },
);

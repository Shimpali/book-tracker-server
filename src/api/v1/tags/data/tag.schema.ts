import { Schema } from 'mongoose';
import { ApplicationModules, Models } from 'src/common/enums';

export const TagCollectionName = ApplicationModules.TAGS;

export const TagSchema = new Schema(
  {
    book: { type: Schema.Types.ObjectId, ref: Models.BOOK },
    title: String,
  },
  {
    collection: TagCollectionName,
    timestamps: true,
  },
);

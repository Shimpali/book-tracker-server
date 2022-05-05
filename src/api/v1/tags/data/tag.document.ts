import { Document, Types } from 'mongoose';
import { Tag } from 'src/common/models';

export interface TagDocument extends Tag, Document {
  __v: number;
  _id: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

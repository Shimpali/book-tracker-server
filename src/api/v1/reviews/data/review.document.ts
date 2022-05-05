import { Document, Types } from 'mongoose';
import { Review } from 'src/common/models';

export interface ReviewDocument extends Review, Document {
  __v: number;
  _id: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

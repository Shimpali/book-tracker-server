import { Document, Types } from 'mongoose';
import { Book } from 'src/common/models';

export interface BookDocument extends Book, Document {
  __v: number;
  _id: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

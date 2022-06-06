import { Document, Types } from 'mongoose';
import { Progress } from 'src/common/models';

export interface ProgressDocument extends Progress, Document {
  __v: number;
  _id: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

import { Document, Types } from 'mongoose';
import { User } from 'src/common/models';

export interface UserDocument extends User, Document {
  __v: number;
  _id: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

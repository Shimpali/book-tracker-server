import { Types } from 'mongoose';

export interface LoginStatus {
  id: Types.ObjectId;
  username: string;
  accessToken: string;
  expiresIn: string;
}

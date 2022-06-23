import { Types } from 'mongoose';

export interface LoginStatus {
  id: Types.ObjectId;
  username: string;
  email: string;
  accessToken: string;
  expiresIn: string;
}

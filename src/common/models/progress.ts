import { PositionType } from '../enums';

export interface Progress {
  currentPosition: number;
  finalPosition: number;
  type: PositionType;
  book: string;
  user: string;
}

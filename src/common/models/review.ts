import { User } from './user';

export interface Review {
  book: string;
  title: string;
  content: string;
  user: User;
}

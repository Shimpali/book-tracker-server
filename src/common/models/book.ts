import { Progress } from './progress';
import { Review } from './review';

export interface Book {
  title: string;
  subtitle?: string;
  authors: string[];
  description: string;
  cover: string;
  pageCount: number;
  link: string;
  publishedDate: string;
  reviews: Review[];
  categories: string[];
  averageRating: number;
  volumeId: string;
  wantToRead: boolean;
  currentlyReading: boolean;
  read: boolean;
  progress: Progress;
}

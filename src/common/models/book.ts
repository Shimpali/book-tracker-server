import { Review } from './review';
import { Tag } from './tag';

export interface Book {
  title: string;
  author: string;
  description: string;
  cover: string;
  pageCount: number;
  link: string;
  genre: string | string[];
  reviews: Review[];
  tags: Tag[];
}

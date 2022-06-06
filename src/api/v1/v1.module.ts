import { Module } from '@nestjs/common';
import { BooksModule } from './books/books.module';
import { ProgressModule } from './progress/progress.module';
import { ReviewsModule } from './reviews/reviews.module';

@Module({
  imports: [BooksModule, ReviewsModule, ProgressModule],
  controllers: [],
  providers: [],
})
export class V1Module {}

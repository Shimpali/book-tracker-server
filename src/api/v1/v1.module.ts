import { Module } from '@nestjs/common';
import { BooksModule } from './books/books.module';
import { ReviewsModule } from './reviews/reviews.module';
import { TagsModule } from './tags/tags.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [BooksModule, ReviewsModule, TagsModule, UsersModule],
  controllers: [],
  providers: [],
})
export class V1Module {}

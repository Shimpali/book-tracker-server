import { Module } from '@nestjs/common';
import { BooksModule } from './books/books.module';

@Module({
  imports: [
    BooksModule,
    // ReviewsModule,
    // UsersModule
  ],
  controllers: [],
  providers: [],
})
export class V1Module {}

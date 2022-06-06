import { Injectable, Query } from '@nestjs/common';
import { QueryParamsDTO } from 'src/common/dto';
import { BookCounts } from 'src/common/models';

import { UserDocument } from '../users/data/user.document';
import { BookDocument } from './data/book.document';
import { BookRepository } from './data/book.repository';
import { AddBookDto } from './dto/add-book.dto';
import { UpdateBookStatusDto } from './dto/update-book-status.dto';

@Injectable()
export class BooksService {
  constructor(private bookRepository: BookRepository) {}

  async add(addBookDto: AddBookDto): Promise<BookDocument> {
    return this.bookRepository.addBook(addBookDto);
  }

  async findAll(
    @Query() queryParams?: QueryParamsDTO,
  ): Promise<BookDocument[]> {
    return this.bookRepository.getAllBooks(queryParams);
  }

  async findOne(id: string): Promise<BookDocument> {
    return this.bookRepository.getBookById(id);
  }

  async updateBookStatus(
    id: string,
    updatedBookStatus: UpdateBookStatusDto,
    user: Partial<UserDocument>,
  ): Promise<BookDocument> {
    return this.bookRepository.updateBookStatus(id, user, updatedBookStatus);
  }

  async remove(id: string) {
    return this.bookRepository.deleteBook(id);
  }

  async getBookCountsByStatus(): Promise<BookCounts> {
    return this.bookRepository.getBookCounts();
  }
}

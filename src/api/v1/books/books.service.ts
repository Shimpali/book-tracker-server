import { Injectable } from '@nestjs/common';
import { BookDocument } from './data/book.document';
import { BookRepository } from './data/book.repository';
import { AddBookDto } from './dto/add-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Injectable()
export class BooksService {
  constructor(private bookRepository: BookRepository) {}

  async add(addBookDto: AddBookDto): Promise<BookDocument> {
    return this.bookRepository.addBook(addBookDto);
  }

  async findAll(): Promise<BookDocument[]> {
    return this.bookRepository.getAllBooks();
  }

  async findOne(id: string): Promise<BookDocument> {
    return this.bookRepository.getBookById(id);
  }

  async update(id: string, updatedBook: UpdateBookDto): Promise<BookDocument> {
    return this.bookRepository.updateBook(id, updatedBook);
  }

  async remove(id: string) {
    return this.bookRepository.deleteBook(id);
  }
}

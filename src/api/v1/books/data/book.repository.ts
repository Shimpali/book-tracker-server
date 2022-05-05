import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AddBookDto } from '../dto/add-book.dto';
import { UpdateBookDto } from '../dto/update-book.dto';
import { BookDocument } from './book.document';
import { BookCollectionName } from './book.schema';

@Injectable()
export class BookRepository {
  constructor(
    @InjectModel(BookCollectionName) private bookModel: Model<BookDocument>
  ) {}

  async addBook(addBookDto: AddBookDto): Promise<BookDocument> {
    const newBook = new this.bookModel(addBookDto);
    return newBook.save();
  }

  async getAllBooks(): Promise<BookDocument[]> {
    return this.bookModel.find().populate('reviews tags').exec();
  }

  async getBookById(id: string): Promise<BookDocument> {
    return this.bookModel.findById(id).populate('reviews tags').exec();
  }

  async updateBook(
    id: string,
    updatedBook: UpdateBookDto
  ): Promise<BookDocument> {
    return this.bookModel.findByIdAndUpdate(id, updatedBook, {
      new: true,
    });
  }

  async deleteBook(id: string) {
    return this.bookModel.findByIdAndRemove(id);
  }
}

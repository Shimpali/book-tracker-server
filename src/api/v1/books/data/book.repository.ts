import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { QueryParamsDTO } from 'src/common/dto';
import { Status } from 'src/common/enums';
import { UserDocument } from '../../users/data/user.document';
import { AddBookDto } from '../dto/add-book.dto';
import { UpdateBookStatusDto } from '../dto/update-book-status.dto';
import { BookDocument } from './book.document';
import { BookCollectionName } from './book.schema';

@Injectable()
export class BookRepository {
  constructor(
    @InjectModel(BookCollectionName) private bookModel: Model<BookDocument>,
  ) {}

  async addBook(addBookDto: AddBookDto): Promise<BookDocument> {
    const newBook = new this.bookModel(addBookDto);
    return newBook.save();
  }

  async getAllBooks(queryParams?: QueryParamsDTO): Promise<BookDocument[]> {
    const { status, search } = queryParams;

    const filterQuery = status ? { status } : {};
    const searchQuery = search
      ? { title: { $regex: new RegExp(`${search || ''}`, 'i') } }
      : {};
    const query = { ...filterQuery, ...searchQuery };

    return this.bookModel
      .find(query)
      .populate('reviews')
      .skip(queryParams?.offset || 0)
      .limit(queryParams?.limit || 10)
      .exec();
  }

  async getBookCounts(): Promise<any> {
    const total = await this.bookModel.count();

    const currentlyReadingCount = await this.bookModel.count({
      status: Status.CurrentlyReading,
    });

    const wantToReadCount = await this.bookModel.count({
      status: Status.WantToRead,
    });

    const readCount = await this.bookModel.count({
      status: Status.Read,
    });

    return { total, currentlyReadingCount, wantToReadCount, readCount };
  }

  async getBookById(id: string): Promise<BookDocument> {
    return this.bookModel.findById(id).populate('reviews').exec();
  }

  async updateBookStatus(
    id: string,
    user: Partial<UserDocument>,
    updatedBookStatus: UpdateBookStatusDto,
  ): Promise<BookDocument> {
    return this.bookModel.findOneAndUpdate(
      { id, user: user?.id },
      { ...updatedBookStatus },
      {
        new: true,
      },
    );
  }

  async deleteBook(id: string) {
    return this.bookModel.findByIdAndRemove(id);
  }
}

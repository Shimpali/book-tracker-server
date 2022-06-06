import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Types } from 'mongoose';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { QueryParamsDTO } from 'src/common/dto';
import { ApplicationModules } from 'src/common/enums';
import { BooksService } from './books.service';
import { BookDocument } from './data/book.document';
import { AddBookDto } from './dto/add-book.dto';
import { UpdateBookStatusDto } from './dto/update-book-status.dto';

@ApiTags(ApplicationModules.BOOKS)
@UseGuards(JwtAuthGuard)
@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post()
  async add(
    @Body() addBookDto: AddBookDto,
    @Req() request,
  ): Promise<BookDocument> {
    const user: Types.ObjectId = request.user?.id;
    return this.booksService.add({ ...addBookDto, user });
  }

  @Get()
  @ApiBearerAuth()
  async findAll(
    @Query() queryParams?: QueryParamsDTO,
  ): Promise<BookDocument[]> {
    return await this.booksService.findAll(queryParams);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<BookDocument> {
    const book: BookDocument = await this.booksService.findOne(id);

    if (!book)
      throw new HttpException('Book not found!', HttpStatus.BAD_REQUEST);

    return book;
  }

  @Patch(':id/status')
  async update(
    @Param('id') id: string,
    @Body() updateBookStatusDto: UpdateBookStatusDto,
    @Req() request,
  ): Promise<BookDocument> {
    return await this.booksService.updateBookStatus(
      id,
      updateBookStatusDto,
      request?.user,
    );
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.booksService.remove(id);
  }
}

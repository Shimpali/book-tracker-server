import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber, IsString, IsUrl } from 'class-validator';
import { Review, Tag } from 'src/common/models';

export class UpdateBookDto {
  @IsString()
  @ApiProperty()
  title: string;

  @IsString()
  @ApiProperty()
  author: string;

  @IsString()
  @ApiProperty()
  description: string;

  @IsString()
  @ApiProperty()
  cover: string;

  @IsNumber()
  @ApiProperty()
  pageCount: string;

  @IsUrl()
  @ApiProperty()
  link: string;

  @IsString()
  @ApiProperty()
  genre: string;

  @IsArray()
  @ApiProperty()
  reviews: Review[];

  @IsArray()
  @ApiProperty()
  tags: Tag[];
}

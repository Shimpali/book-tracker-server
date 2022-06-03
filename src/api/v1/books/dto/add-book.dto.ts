import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber, IsString, IsUrl } from 'class-validator';
import { Review } from 'src/common/models';

export class AddBookDto {
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
  categories: string[];

  @IsArray()
  @ApiProperty()
  reviews: Review[];

  @IsString()
  @ApiProperty()
  volumeId: string[];
}

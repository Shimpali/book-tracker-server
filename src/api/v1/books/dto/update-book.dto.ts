import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';
import { Review } from 'src/common/models';

export class UpdateBookDto {
  @IsString()
  @ApiProperty()
  title: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  subtitle?: string;

  @IsString()
  @ApiProperty()
  authors: string[];

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

  @IsNumber()
  @ApiProperty()
  publishedDate: string;

  @IsString()
  @ApiProperty()
  categories: string[];

  @IsNumber()
  @ApiProperty()
  averageRating: number;

  @IsArray()
  @ApiProperty()
  reviews: Review[];

  @IsNumber()
  @ApiProperty()
  volumeId: number;
}

import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class AddReviewDto {
  @IsMongoId()
  @ApiProperty()
  book: string;

  @IsString()
  @ApiProperty()
  title: string;

  @IsString()
  @ApiProperty()
  content: string;

  @IsMongoId()
  @ApiProperty()
  user: Types.ObjectId;
}

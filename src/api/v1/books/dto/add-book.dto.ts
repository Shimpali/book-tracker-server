import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsMongoId, IsNumber, IsString, IsUrl } from 'class-validator';
import { Types } from 'mongoose';
import { Status } from 'src/common/enums';

export class AddBookDto {
  @IsString()
  @ApiProperty()
  title: string;

  @IsString({ each: true })
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

  @IsString({ each: true })
  @ApiProperty()
  categories: string[];

  @IsString()
  @ApiProperty()
  volumeId: string[];

  @IsMongoId()
  @ApiProperty()
  user: Types.ObjectId;

  @IsEnum(Status)
  @ApiProperty({
    enum: Status,
  })
  status: Status;
}

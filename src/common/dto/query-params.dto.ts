import {
  IsEnum,
  IsMongoId,
  IsNumberString,
  IsOptional,
  IsString,
} from 'class-validator';

import { ApiPropertyOptional } from '@nestjs/swagger';
import { Types } from 'mongoose';
import { Status } from '../enums';

export class QueryParamsDTO {
  @IsEnum(Status)
  @IsOptional()
  @ApiPropertyOptional({
    enum: Status,
  })
  status: Status;

  @IsMongoId()
  @IsOptional()
  @ApiPropertyOptional()
  user: Types.ObjectId;

  @IsMongoId()
  @IsOptional()
  @ApiPropertyOptional()
  book: Types.ObjectId;

  @IsOptional()
  @ApiPropertyOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @ApiPropertyOptional()
  @IsNumberString()
  limit?: number;

  @IsOptional()
  @ApiPropertyOptional()
  @IsNumberString()
  offset?: number;
}

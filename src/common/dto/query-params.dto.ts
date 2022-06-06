import { IsEnum, IsNumberString, IsOptional, IsString } from 'class-validator';

import { ApiPropertyOptional } from '@nestjs/swagger';
import { Status } from '../enums';

export class QueryParamsDTO {
  @IsEnum(Status)
  @ApiPropertyOptional({
    enum: Status,
  })
  status: Status;

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

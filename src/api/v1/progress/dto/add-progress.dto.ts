import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsMongoId, IsNumber } from 'class-validator';
import { Types } from 'mongoose';
import { PositionType } from 'src/common/enums';

export class AddProgressDto {
  @IsMongoId()
  @ApiProperty()
  book: Types.ObjectId;

  @IsNumber()
  @ApiProperty()
  currentPosition: number;

  @IsNumber()
  @ApiProperty()
  finalPosition: number;

  @IsEnum(PositionType)
  @ApiProperty()
  type: PositionType;

  @IsMongoId()
  @ApiProperty()
  user: Types.ObjectId;
}

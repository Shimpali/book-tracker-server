import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber } from 'class-validator';
import { PositionType } from 'src/common/enums';

export class UpdateProgressDto {
  @IsNumber()
  @ApiProperty()
  currentPosition: number;

  @IsNumber()
  @ApiProperty()
  finalPosition: number;

  @IsEnum(PositionType)
  @ApiProperty()
  type: PositionType;
}

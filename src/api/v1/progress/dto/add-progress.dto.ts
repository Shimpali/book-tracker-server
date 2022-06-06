import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsMongoId, IsNumber, ValidateNested } from 'class-validator';
import { PositionType, User } from 'src/common/models';

export class AddProgressDto {
  @IsMongoId()
  @ApiProperty()
  book: string;

  @IsNumber()
  @ApiProperty()
  currentPosition: number;

  @IsNumber()
  @ApiProperty()
  finalPosition: number;

  @IsEnum(PositionType)
  @ApiProperty()
  type: PositionType;

  @ValidateNested()
  @ApiProperty()
  user: User;
}

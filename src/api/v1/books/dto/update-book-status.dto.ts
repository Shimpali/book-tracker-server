import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { Status } from 'src/common/enums';

export class UpdateBookStatusDto {
  @IsEnum(Status)
  @ApiProperty({
    enum: Status,
  })
  status: Status;
}

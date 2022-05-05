import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsString, ValidateNested } from 'class-validator';
import { User } from 'src/common/models';

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

  @ValidateNested()
  @ApiProperty()
  user: User;
}

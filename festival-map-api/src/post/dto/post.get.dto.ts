import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString } from 'class-validator';

export class PostGetDto {
  @ApiProperty({ required: true })
  @IsNumberString()
  readonly page: number = 0;
}

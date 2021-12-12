import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ReplyCreateDto {
  @ApiProperty({ required: true })
  @IsString()
  readonly content: string;

  createdBy: string;
}
